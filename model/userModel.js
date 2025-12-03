const { required } = require("joi");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("users", UserSchema);

module.exports = userModel;
