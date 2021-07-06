const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const db = require("../conf/db/server");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const encrypt = require("./auth");

const randomString = () => {
  return Math.random().toString(36).substr(2, 11);
};
const key = randomString();

router.get("/", (req, res) => {
  res.send("HI");
});

router.post("/signup", async (req, res) => {
  let id = req.body.id;
  let password = req.body.password;
  let age = req.body.age;
  let height = req.body.height;
  let address = req.body.address;
  let { key, salt } = await encrypt(password); //비밀번호 암호화

  User.findOne({ id: id }, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      if (user == null) {
        newUser = new User({
          id,
          password: key,
          salt,
          age,
          height,
          address,
        });
        newUser.save();
        res.send({ success: true });
      } else {
        res.send({ success: false });
        console.log("signup fail");
      }
    }
  });
});

router.post("/login", (req, res) => {
  let id = req.body.id;
  let password = req.body.password;

  //user정보의 salt를 이용해 똑같이 암호화 해서 암호화된 password와 비교
  User.findOne({ id: id }, async (err, user) => {
    if (err) {
      res.send(err);
    } else {
      if (user !== null) {
        let { key } = await encrypt(password, user.salt);
        if (user.password === key) {
          const token = jwt.sign({ id: id }, key);
          console.log(token);
          res.send(token);
        } else {
          res.send("fail");
        }
      } else {
        res.send("fail");
      }
    }
  });
});

router.post("/check_login", (req, res) => {
  const token = req.body.jwt;
});

module.exports = router;
