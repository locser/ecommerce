const express = require('express');
const productController = require('../controller/productController');
const authController = require('../controller/authController');
const uploadPhoto = require('../middleware/uploadImage');

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

router.put(
  '/upload-image/:productId',
  authController.protect,
  authController.restrictTo('admin'),
  uploadPhoto.uploadImage.array('images', 10),
  uploadPhoto.productImageResize,
  productController.uploadImages
);
router.delete(
  '/delete-image/:productId',
  authController.protect,
  authController.restrictTo('admin'),
  productController.deleteImage
);

module.exports = router;
