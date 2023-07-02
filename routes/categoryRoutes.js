const express = require('express');
const authController = require('../controller/authController');
const categoryController = require('../controller/categoryController');

const router = express.Router();
router
  .route('/')
  .get(categoryController.getAllCategory)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    categoryController.createCategory
  );

router
  .route('/:id')
  .get(categoryController.getCategoryById)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    categoryController.updateCategoryById
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    categoryController.deleteCategory
  );
module.exports = router;
