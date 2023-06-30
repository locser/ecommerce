const express = require('express');
const authController = require('../controller/authController');
const blogCategoryController = require('../controller/blogCategoryController');

const router = express.Router();
router
  .route('/')
  .get(blogCategoryController.getAllBlog)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    blogCategoryController.createBlog
  );

router
  .route('/:id')
  .get(blogCategoryController.getBlogById)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    blogCategoryController.updateBlogById
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    blogCategoryController.deleteBlog
  );
