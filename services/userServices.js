const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const Factory = require("./handlersFactory");
// @desc    Get list of user
// @route   GET /api/v1/User
// @access  Public
exports.getAllUser = Factory.getAll(User);
// @desc    Get  of User
// @route   GET /api/v1/User:id
// @access  Public
exports.getUser = Factory.getOne(User);

// @desc    Create User
// @route   POST  /api/v1/User
// @access  Private
exports.createUser = Factory.createOne(User);

// @desc    updata User
// @route   put  /api/v1/User
// @access  Private
exports.updateUser = Factory.updateOne(User);

// @desc    delete User
// @route   delete  /api/v1/User
// @access  Private
exports.deleteUser = Factory.deleteOne(User);
