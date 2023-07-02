const express = require('express');
const authController = require('../controller/authController');
const brandController = require('../controller/brandController');

const router = express.Router();
router
  .route('/')
  .get(brandController.getAllBrand)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    brandController.createBrand
  );

router
  .route('/:id')
  .get(brandController.getBrandById)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    brandController.updateBrandById
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    brandController.deleteBrand
  );
module.exports = router;
