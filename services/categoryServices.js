const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const Factory = require("./handlersFactory");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");

// Upload single image
exports.uploadCategoryImage = uploadSingleImage("image");

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/categories/${filename}`);

    // Save image into our db
    req.body.image = filename;
  }

  next();
});
// @desc    Get list of categories
// @route   GET /api/v1/category
// @access  Public
exports.getAllCategory = Factory.getAll(Category);
// @desc    Get  of category
// @route   GET /api/v1/category:id
// @access  Public
exports.getCategory = Factory.getOne(Category);

// @desc    Create category
// @route   POST  /api/v1/category
// @access  Private
exports.createCategory = Factory.createOne(Category);

// @desc    updata category
// @route   put  /api/v1/category
// @access  Private
exports.updateCategory = Factory.updateOne(Category);

// @desc    delete category
// @route   delete  /api/v1/category
// @access  Private
exports.deleteCategory = Factory.deleteOne(Category);
