const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");
const Factory = require("./handlersFactory");
const Product = require("../models/productsModel");

const calcTotalCartPrice = (cart) => {
  let totalPrice = 0;
  cart.cartItems.forEach((item) => {
    totalPrice += item.quantity * item.price;
  });
  cart.totalCartPrice = totalPrice;
  cart.totalPriceAfterDiscount = undefined;
  return totalPrice;
};
// @desc    Get list of Oreders
// @route   GET /api/v1/Oreder
// @access  Private
exports.getAllOreder = Factory.getAll(Order);

// @desc    Get  of Oreder
// @route   GET /api/v1/Oreder
// @access  Private
exports.filterOrderForLoggedUser = asyncHandler(async (req, res, next) => {
  if (req.user.role === "user") {
    req.filterObj = { user: req.user._id };
  } else {
    res.status(405);
  }
  next();
});

// @desc    Create Oreder
// @route   POST  /api/v1/Oreder
// @access  Public
exports.addOrder = asyncHandler(async (req, res) => {
  const order = await Order.create(req.body);

  // Calculate total cart price
  calcTotalCartPrice(order);
  await order.save();

  res.status(201).json({ data: order });
});

// exports.addOrder = asyncHandler(async (req, res, next) => {
//   const { productId } = req.body;
//   const product = await Product.findById(productId);

//   // 1) Get Cart for logged user
//   // let cart = await Order.findOne({ user: req.user._id });

//   // if (!cart) {
//   //   // create cart fot logged user with product
//   const cart = await Order.create({
//     user: req.user._id,
//     cartItems: [{ product: productId, price: product.price }],
//   });
//   // } else {
//   //   // product exist in cart, update product quantity
//   //   const productIndex = cart.cartItems.findIndex(
//   //     (item) => item.product.toString() === productId
//   //   );

//   if (productIndex > -1) {
//     const cartItem = cart.cartItems[productIndex];
//     cartItem.quantity += 1;

//     cart.cartItems[productIndex] = cartItem;
//   } else {
//     // product not exist in cart,  push product to cartItems array
//     cart.cartItems.push({ product: productId, price: product.price });
//   }

//   // Calculate total cart price
//   calcTotalCartPrice(cart);
//   await cart.save();

//   res.status(200).json({
//     status: "success",
//     message: "Product added to cart successfully",
//     numOfCartItems: cart.cartItems.length,
//     data: cart,
//   });
// });
// @desc    updata Oreder
// @route   put  /api/v1/Oreder
// @access  Private
exports.updateOreder = asyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!order) {
    return next(new ApiError(`No order for this id ${req.params.id}`, 404));
  }
  await calcTotalCartPrice(order);

  res.status(200).json({ data: order });
});

// @desc    delete Oreder
// @route   delete  /api/v1/Oreder
// @access  Private
exports.deleteOreder = Factory.deleteOne(Order);
