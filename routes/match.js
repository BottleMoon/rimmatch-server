const express = require("express");
const router = express.Router();
const Match = require("../models/match");
const User = require("../models/user");

const stringToDate = (date) => {
  const newDate = new Date(
    date.substring(0, 4),
    date.substring(4, 6) - 1,
    date.substring(6, 8)
  );
  return newDate;
};

router.get("/find/:id", (req, res) => {
  const _id = req.params.id;
  console.log("_id is " + _id);
  Match.findOne({ _id: _id }, (err, docs) => {
    if (err) {
      res.send(err);
    }
    res.json(docs);
  });
});

router.get("/list/:place/:matchdate/:userid", (req, res) => {
  const place = req.params.place;
  const req_matchdate = req.params.matchdate;
  const req_userid = req.params.userid;
  const matchdate = stringToDate(req_matchdate);
  const matchdate_next = stringToDate(req_matchdate);

  matchdate_next.setDate(matchdate_next.getDate() + 1);
  if (req_userid !== "all") {
    console.log(req_userid);
    Match.find({ joinusers: req_userid })
      .sort({ createdate: "desc" })
      .exec((err, docs) => {
        console.log(docs);
        res.json(docs);
      });
  } else {
    if (place === "all") {
      if (req_matchdate === "all") {
        Match.find({})
          .sort({ createdate: "desc" })
          .exec(function (err, docs) {
            res.json(docs);
          });
      } else {
        Match.find({ matchdate: { $gte: matchdate, $lt: matchdate_next } })
          .sort({ createdate: "desc" })
          .exec(function (err, docs) {
            res.json(docs);
            console.log("gte : " + matchdate + " lt :" + matchdate_next);
          });
      }
    } else {
      if (req_matchdate === "all") {
        Match.find({ place: place })
          .sort({ createdate: "desc" })
          .exec(function (err, docs) {
            res.json(docs);
          });
      } else {
        Match.find({
          matchdate: { $gte: matchdate, $lt: matchdate_next },
          place: place,
        })
          .sort({ createdate: "desc" })
          .exec(function (err, docs) {
            res.json(docs);
          });
      }
    }
  }
});

//Match create
router.post("/create", (req, res) => {
  let title = req.body.title;
  let admin = req.body.admin;
  let place = req.body.place;
  let createdate = req.body.createdate;
  let matchdate = req.body.matchdate;

  newMatch = new Match({
    title: title,
    joinusers: [admin],
    place: place,
    createdate: createdate,
    matchdate: matchdate,
  });

  newMatch.save(function (err, match) {
    console.log(match._id);
    console.log(admin);
    User.updateOne(
      //update admin's mymatch
      { id: admin },
      { $push: { mymatch: match._id.toString() } },
      (err) => {
        console.log(err);
      }
    );
  });

  res.send({ success: true });
});

router.post("/apply", (req, res) => {
  let matchid = req.body.matchid;
  let userid = req.body.userid;

  Match.updateOne({ _id: matchid }, { $push: { joinusers: userid } })
    .then((data) => {
      console.log("updated success!!");
    })
    .then(() => {
      User.updateOne({ id: userid }, { $push: { mymatch: matchid } })
        .then(() => res.json(true))
        .catch((err) => {
          console.log("err!!" + err);
        });
    })
    .catch((err) => {
      console.log("err!!" + err);
    });
});
module.exports = router;
