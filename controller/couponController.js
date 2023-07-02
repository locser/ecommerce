const Coupon = require('../models/couponModel');
const factory = require('./handleFactory');

const asyncHandler = require('express-async-handler');

exports.createCoupon = factory.createOne(Coupon);
exports.getAllCoupon = factory.getAll(Coupon);
exports.getCouponById = factory.getOne(Coupon);
exports.updateCouponById = factory.updateOneById(Coupon);
exports.deleteCoupon = factory.deleteOne(Coupon);
