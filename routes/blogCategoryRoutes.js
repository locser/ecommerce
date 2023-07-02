const express = require('express');
const authController = require('../controller/authController');
const blogCategoryController = require('../controller/blogCategoryController');

const router = express.Router();
router
  .route('/')
  .get(blogCategoryController.getAllBlogCategory)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    blogCategoryController.createBlogCategory
  );

router
  .route('/:id')
  .get(blogCategoryController.getBlogCategoryById)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    blogCategoryController.updateBlogCategoryById
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    blogCategoryController.deleteBlogCategory
  );
module.exports = router;
