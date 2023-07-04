const User = require('../models/userModel');
const Product = require('../models/productModel');
const Cart = require('../models/cartModel');
const Coupon = require('../models/couponModel');
const Order = require('../models/orderModel');
const asyncHandler = require('express-async-handler');
const factory = require('./handleFactory');
const AppError = require('../utils/appError');
const validateMongoDbId = require('../utils/validateMongodbId');

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

exports.getWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  try {
    const findUser = await User.findById(_id).populate('wishlist');
    res.json(findUser);
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
});

//TODO: do something
exports.userCart = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { cart } = req.body;

  validateMongoDbId(id);
  try {
    let products = [];

    const user = await User.findById(_id);

    //check if user already have product in cart
    const alreadyExistCart = await Cart.findOne({ orderby: user._id });
    if (alreadyExistCart) {
      alreadyExistCart.remove();
    }
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.count = cart[i].count;
      object.color = cart[i].color;

      let getPrice = await Product.findById(cart[i]._id).select('price').exec();
      object.price = getPrice;
      products.push(object);
    }

    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].count * products[i].price;
    }
    let newCart = await new Cart({
      products,
      cartTotal,
      orderby: user._id,
    }).save();
    res.json(newCart);
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
});

exports.getUserCart = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;

  validateMongoDbId(_id);

  try {
    const cart = await Cart.findOne({ orderby: _id });
    res.json(cart);
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
});

exports.emptyCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  validateMongoDbId(_id);

  try {
    const user = await User.findOne({ _id: _id });
    const cart = await Cart.findOneAndRemove({ orderby: user._id });
    res.json(cart);
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
});

exports.applyCoupon = asyncHandler(async (req, res) => {
  const { coupon } = req.params;
  const validCoupon = await Coupon.findOne({ name: coupon });
  // console.log('validCoupon '+ validCoupon);
  if (!validCoupon) {
    throw new Error('Invalid coupon');
  }
  const user = await User.findOne({ _id });

  let { cartTotal } = await Cart.findOne({
    orderby: user._id,
  }).populate('products.product');
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.disount) / 100
  ).toFixed(2);

  await Cart.findOneAndUpdate(
    { orderby: user._id },
    { totalAfterDiscount: totalAfterDiscount },
    { new: true }
  );

  res.json(totalAfterDiscount);
});

// TODO: read this
exports.createOrder = asyncHandler(async (req, res) => {
  const { COD, couponApplied } = req.body;
  const { _id } = req.user;

  validateMongoDbId(_id);

  try {
    if (!COD) throw new Error('Create Order failed');
    const user = await User.findById(_id);

    let userCart = await Cart.findOne({ orderby: user._id });

    let finalAmount = 0;
    if (couponApplied && userCart.totalAfterDiscount) {
      finalAmount = userCart.totalAfterDiscount * 100;
    } else {
      finalAmount = userCart.cartTotal * 100;
    }
    let newOrder = await new Order({
      products: userCart.products,
      paymentIntent: {
        id: uniqid(),
        method: 'COD',
        amount: finalAmount,
        status: 'Cash on Delivery',
        createdAt: Date.now(),
        currency: 'USD',
      },
      orderby: user._id,
      orderStatus: 'Cash on Delivery',
    }).save();

    let update = userCart.products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product._id },
          update: { $inc: { quantity: -item.count, sold: +item.count } },
        },
      };
    });

    const updated = await Product.bulkWrite(update, {});
    res.json({ message: 'success' });
  } catch (error) {
    throw new Error(error);
  }
});

exports.getOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);

  try {
    const userorders = await Order.findOne({ _id: _id });
    res.json(userorders);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
});

exports.updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  validateMongoDbId(id);

  try {
    const findOrder = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      { new: true }
    );
    res.json(findOrder);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
});
