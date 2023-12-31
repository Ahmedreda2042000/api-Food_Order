const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
// 1- Create Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, "Too short  name"],
      maxlength: [32, "Too long  name"],
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [3, "Too short  username"],
      maxlength: [32, "Too long  username"],
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
    phone: String,
    profileImg: String,
    role: {
      type: String,
      enum: ["user", "manager", "admin"],
      default: "user",
    },
    city: String,
    state: String,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // Hashing user password
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("Users", userSchema);
