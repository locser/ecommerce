const express = require('express');
const authController = require('../controller/authController');
const categoryController = require('../controller/categoryController');

const router = express.Router();
router
  .route('/')
  .get(blogController.getAllBlog)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    blogController.createBlog
  );

router
  .route('/:id')
  .get(blogController.getBlogById)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    blogController.updateBlogById
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    blogController.deleteBlog
  );
