const express = require('express');
const authController = require('../controller/authController');
const blogController = require('../controller/blogController');
const uploadPhoto = require('../middleware/uploadImage');

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

router.put(
  '/upload/:blogId',
  authController.protect,
  authController.restrictTo('admin'),
  uploadPhoto.uploadImage.array('images', 2),
  uploadPhoto.blogImageResize,
  blogController.uploadImages
);

module.exports = router;
