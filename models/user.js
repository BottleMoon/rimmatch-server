const mongoose = require("mongoose");
userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  password: String,
  age: String,
  height: Number,
  address: String,
  mymatch: [],
  mypart: [],
});

module.exports = mongoose.model("User", userSchema);
