const express = require('express');
const authController = require('../controller/authController');
const brandController = require('../controller/brandController');

const router = express.Router();
router
  .route('/')
  .get(blogController.getAllBlog)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    brandController.createBlog
  );

router
  .route('/:id')
  .get(brandController.getBlogById)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    brandController.updateBlogById
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    brandController.deleteBlog
  );
