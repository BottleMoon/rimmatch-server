const express = require("express");
const router = express.Router();
const Club = require("../models/club");
const User = require("../models/user");

router.get("/list/", (req, res) => {
  Club.find({})
    .sort({ createdate: "desc" })
    .exec((err, docs) => {
      res.json(docs);
    });
});

router.post("/create/", (req, res) => {
  const clubname = req.body.clubname;
  const numberofmember = req.body.numberofmember;
  const createdate = req.body.createdate;
  const admin = req.body.admin;
  const newClub = new Club({
    clubname,
    numberofmember,
    createdate,
    admin,
  });
  newClub.save((err, club) => {
    User.updateOne(
      { id: admin },
      {
        $push: { myclub: club._id.toString() },
      },
      (err) => {
        if (err) console.log("err");
      }
    ).then(() => {
      console.log("created club : " + clubname);
      res.json("success");
    });
  });
});
module.exports = router;
