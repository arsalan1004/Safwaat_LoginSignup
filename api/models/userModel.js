const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    gender: String,
    dateOfBirth: String,
  },
  { collection: "User" },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

module.exports = {
  userModel,
};
