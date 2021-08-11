const mongoose = require("mongoose");
const clubSchema = new mongoose.Schema({
  clubid: { type: mongoose.Schema.Types.ObjectId },
  clubname: { type: String, required: true },
  admin: { type: String, unique: true },
  member: [String],
  numberofmember: { type: Number, required: true },
  createdate: Date,
});
module.exports = mongoose.model("Club", clubSchema);
