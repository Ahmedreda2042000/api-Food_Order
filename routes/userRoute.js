const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../services/userServices");
// const {
//   deleteUserValidator,
//   updateUserValidator,
//   createUserValidtor,
//   getUserValidator,
// } = require("../utils/validators/UserValidator");
router.route("/").post(createUser).get(getAllUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
