const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const factory = require('./handleFactory');
const AppError = require('../utils/appError');
const validateMongoDbId = require('../utils/validateMongoDbId');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.getAllUsers = factory.getAll(User);

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = asyncHandler(async (req, res, next) => {
  // if (req.body.password || req.body.passwordConfirm) {
  if (req.body.password) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updatePassword .',
        400
      )
    );
  }

  // 2 filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'firstname', 'lastname');
  // 3 update user document
  const updateUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.json({
    status: 'success',
    data: {
      user: updateUser,
    },
  });
});

exports.deleteMe = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: 'null',
  });
});

// WARNING: don't update passwords with this method
exports.deleteUser = factory.deleteOne(User);
exports.updateUser = factory.updateOneById(User);
exports.getUser = factory.getOne(User);

// exports.createUser = factory.createOne(User);

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined! Please use /signup instead.',
  });
};

exports.saveAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  validateMongoDbId(_id);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    throw new AppError('Update address failed');
  }
});
