const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  age: Number,
  dob: Date,
  work: String,
  password: String,
  mobile: String,
  role: { type: String, enum: ["admin", "user"], default: "user" },
  isBlocked: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", UserSchema);
