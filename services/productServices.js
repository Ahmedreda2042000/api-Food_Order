const Product = require("../models/productsModel");
const Factory = require("./handlersFactory");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");

const { uploadMixOfImages } = require("../middlewares/uploadImageMiddleware");

exports.uploadProductImages = uploadMixOfImages([
  {
    name: "imageCover",
    maxCount: 1,
  },
  {
    name: "images",
    maxCount: 5,
  },
]);

exports.resizeProductImages = asyncHandler(async (req, res, next) => {
  // console.log(req.files);
  //1- Image processing for imageCover
  if (req.files.imageCover) {
    const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;

    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat("jpg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/products/${imageCoverFileName}`);

    // Save image into our db
    req.body.imageCover = imageCoverFileName;
  }
  //2- Image processing for images
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat("jpg")
          .jpeg({ quality: 95 })
          .toFile(`uploads/products/${imageName}`);

        // Save image into our db
        req.body.images.push(imageName);
      })
    );

    next();
  }
});
// @desc    Get list of product
// @route   GET /api/v1/product
// @access  Public
exports.getAllproduct = Factory.getAll(Product);
// @desc    Get  of product
// @route   GET /api/v1/product:id
// @access  Public
exports.getproduct = Factory.getOne(Product);

// @desc    Create product
// @route   POST  /api/v1/product
// @access  Private
exports.createproduct = Factory.createOne(Product);

// @desc    updata product
// @route   put  /api/v1/product
// @access  Private
exports.updateproduct = Factory.updateOne(Product);

// @desc    delete product
// @route   delete  /api/v1/product
// @access  Private
exports.deleteproduct = Factory.deleteOne(Product);
