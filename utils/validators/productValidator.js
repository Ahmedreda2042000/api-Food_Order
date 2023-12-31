const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product id format"),
  validatorMiddleware,
];

exports.createProductValidtor = [
  check("name")
    .notEmpty()
    .withMessage("Product required")
    .isLength({ min: 3 })
    .withMessage("Too short Product name"),
  check("description")
    .notEmpty()
    .withMessage("description required")
    .isLength({ min: 3 })
    .withMessage("Too short description name"),
  check("category")
    .isMongoId()
    .withMessage("invald id category")
    .notEmpty()
    .withMessage("category required"),
  check("readyTime").optional().isNumeric(),
  check("price").notEmpty().withMessage("price required").isNumeric(),
  validatorMiddleware,
];
exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product id format"),
  validatorMiddleware,
];

exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product id format"),
  validatorMiddleware,
];
