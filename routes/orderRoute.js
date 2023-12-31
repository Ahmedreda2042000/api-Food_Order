const express = require("express");
const router = express.Router();
const {
  deleteOreder,
  updateOreder,
  addOrder,
  filterOrderForLoggedUser,
  getAllOreder,
} = require("../services/orderServices");

const { protect, allowedTo } = require("../services/authService");
router
  .route("/addOrder")
  .post(protect, allowedTo("user", "manager"), addOrder)
  .get(
    protect,
    allowedTo("admin", "manager"),
    filterOrderForLoggedUser,
    getAllOreder
  );
router
  .route("/:id")
  .get(protect, allowedTo("user"), filterOrderForLoggedUser)
  .put(protect, allowedTo("user", "manager"), updateOreder)
  .delete(
    protect,
    allowedTo("user", "manager"),

    deleteOreder
  );

module.exports = router;
