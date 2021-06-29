const bodyParser = require("body-parser");
const express = require("express");
const router = express.Router();
const db = require("../db/server");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const randomString = () => {
  return Math.random().toString(36).substr(2, 11);
};
const key = randomString();

router.get("/", (req, res) => {
  res.send("HI");
});

router.post("/signup", (req, res) => {
  let id = req.body.id;
  let password = req.body.password;
  let age = req.body.age;
  let height = req.body.height;
  let address = req.body.address;
  User.findOne({ id: id }, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      if (user == null) {
        newUser = new User({
          id: id,
          password: password,
          age: age,
          height: height,
          address: address,
        });

        newUser.save();
        res.send({ success: true });
      } else {
        res.send({ success: false });
        console.log("fail");
      }
    }
  });
});

router.post("/login", (req, res) => {
  let id = req.body.id;
  let password = req.body.password;
  User.findOne({ id: id }, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      if (user != null && user.password == password) {
        const token = jwt.sign({ id: id }, key);
        console.log(token);
        res.send(token);
      } else {
        res.send("fail");
      }
    }
  });
});

router.post("/check_login", (req, res) => {
  const token = req.body.jwt;
  var decoded_data = jwt.verify(token, key);
});
module.exports = router;
