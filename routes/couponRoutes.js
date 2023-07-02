const express = require('express');
const authController = require('../controller/authController');
const couponController = require('../controller/couponController');

const router = express.Router();
router
  .route('/')
  .get(couponController.getAllCoupon)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    couponController.createCoupon
  );

router
  .route('/:id')
  .get(couponController.getCouponById)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    couponController.updateCouponById
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    couponController.deleteCoupon
  );
module.exports = router;
