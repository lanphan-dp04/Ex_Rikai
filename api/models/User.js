const mongoose = require("mongoose");
const { Role } = require("../utils/role");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.USER,
      requited: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
