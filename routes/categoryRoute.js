const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  resizeImage,
  uploadCategoryImage,
} = require("../services/categoryServices");
const {
  deleteCategoryValidator,
  updateCategoryValidator,
  createCategoryValidtor,
  getCategoryValidator,
} = require("../utils/validators/categoryValidator");

const { protect, allowedTo } = require("../services/authService");
router
  .route("/")
  .post(
    protect,
    allowedTo("admin", "manager"),
    uploadCategoryImage,
    resizeImage,
    createCategoryValidtor,
    createCategory
  )
  .get(getAllCategory);
router
  .route("/:id")
  .get(getCategoryValidator, getCategory)
  .put(
    protect,
    allowedTo("admin", "manager"),
    uploadCategoryImage,
    resizeImage,
    updateCategoryValidator,
    updateCategory
  )
  .delete(
    protect,
    allowedTo("admin", "manager"),
    deleteCategoryValidator,
    deleteCategory
  );

module.exports = router;
