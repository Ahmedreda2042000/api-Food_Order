const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true,
  },
  readyTime: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  imageCover: {
    type: String,
    required: [true, "Product Image cover is required"],
  },
  images: [String],
});

module.exports = mongoose.model("Food", productSchema);
