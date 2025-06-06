const mongoose = require("mongoose");

const userShema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please enter your username"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Specifikuojame leidžiamas rolių reikšmes
      default: "user",
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamp: true,
  }
);

const User = mongoose.model("User", userShema);
module.exports = User;
