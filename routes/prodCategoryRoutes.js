const express = require('express');
const authController = require('../controller/authController');
const prodCategoryController = require('../controller/prodCategoryController');

const router = express.Router();
router
  .route('/')
  .get(prodCategoryController.getAllBlog)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    prodCategoryController.createBlog
  );

router
  .route('/:id')
  .get(prodCategoryController.getBlogById)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    prodCategoryController.updateBlogById
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    prodCategoryController.deleteBlog
  );
