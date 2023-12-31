const express = require('express');
const authController = require('../controller/authController');
const prodCategoryController = require('../controller/prodCategoryController');

const router = express.Router();
router
  .route('/')
  .get(prodCategoryController.getAllProdCategory)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    prodCategoryController.createProdCategory
  );

router
  .route('/:id')
  .get(prodCategoryController.getProdCategoryById)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    prodCategoryController.updateProdCategoryById
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    prodCategoryController.deleteProdCategory
  );
module.exports = router;
