const express = require("express");
const router = express.Router();
const {
  createproduct,
  getAllproduct,
  getproduct,
  updateproduct,
  deleteproduct,
  uploadProductImages,
  resizeProductImages,
} = require("../services/productServices");
const {
  deleteProductValidator,
  updateProductValidator,
  createProductValidtor,
  getProductValidator,
} = require("../utils/validators/productValidator");
const { protect, allowedTo } = require("../services/authService");

router
  .route("/")
  .post(
    protect,
    allowedTo("admin", "manager"),
    uploadProductImages,
    resizeProductImages,
    createProductValidtor,
    createproduct
  )
  .get(getAllproduct);
router
  .route("/:id")
  .get(getProductValidator, getproduct)
  .put(
    protect,
    allowedTo("admin", "manager"),
    uploadProductImages,
    resizeProductImages,
    updateProductValidator,
    updateproduct
  )
  .delete(
    protect,
    allowedTo("admin", "manager"),
    deleteProductValidator,
    deleteproduct
  );

module.exports = router;
