const mongoose = require("mongoose");
userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  password: String,
  salt: String,
  age: String,
  height: Number,
  address: String,
  mymatch: [],
  myparty: [],
});

module.exports = mongoose.model("User", userSchema);
