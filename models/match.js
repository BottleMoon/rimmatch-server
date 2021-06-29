const mongoose = require("mongoose");
const matchSchema = new mongoose.Schema({
  matchid: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  joinusers: [String],
  place: { type: String, required: true },
  createdate: Date,
  matchdate: Date,
});

module.exports = mongoose.model("Match", matchSchema);
