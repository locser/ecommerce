const express = require('express');
const authController = require('../controller/authController');
const enqController = require('../controller/enqController');

const router = express.Router();
router
  .route('/')
  .get(enqController.getAllEnquiry)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    enqController.createEnquiry
  );

router
  .route('/:id')
  .get(enqController.getEnquiryById)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    enqController.updateEnquiryById
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    enqController.deleteEnquiry
  );
module.exports = router;
