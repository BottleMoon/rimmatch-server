const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/find/:id", (req, res) => {
  const id = req.params.id;
  User.findOne({ id: id }).exec(function (err, docs) {
    if (err) {
      console.log("err!");
      res.send(err);
    } else {
      console.log(docs);
      res.json(docs);
    }
  });
});
module.exports = router;
