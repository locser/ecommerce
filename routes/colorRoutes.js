const express = require('express');
const authController = require('../controller/authController');
const colorController = require('../controller/colorController');

const router = express.Router();
router
  .route('/')
  .get(colorController.getAllColor)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    colorController.createColor
  );

router
  .route('/:id')
  .get(colorController.getColorById)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    colorController.updateColorById
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    colorController.deleteColor
  );
module.exports = router;
