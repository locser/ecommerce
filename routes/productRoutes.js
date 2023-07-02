const express = require('express');
const productController = require('../controller/productController');
const authController = require('../controller/authController');

const router = express.Router();

router
  .route('/')
  .get(productController.getAllProduct)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    productController.createProduct
  );

router
  .route('/:id')
  .get(productController.getProductById)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    productController.updateProductById
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    productController.deleteProduct
  );

router.put(
  '/wishlist',
  authController.protect,
  productController.addToWishList
);
router.put('/rating', authController.protect, productController.rating);

module.exports = router;
