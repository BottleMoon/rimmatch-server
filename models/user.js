const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  password: String,
  salt: String,
  age: String,
  height: Number,
  address: String,
  mymatch: [mongoose.Schema.Types.ObjectId],
  myclub: [mongoose.Schema.Types.ObjectId],
});

module.exports = mongoose.model("User", userSchema);
