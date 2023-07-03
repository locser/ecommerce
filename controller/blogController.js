const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const factory = require('./handleFactory');
const fs = require('fs');

const asyncHandler = require('express-async-handler');

exports.createBlog = factory.createOne(Blog);
exports.getAllBlog = factory.getAll(Blog);
exports.getBlogById = factory.getOne(Blog);
exports.updateBlogById = factory.updateOneById(Blog);
exports.deleteBlog = factory.deleteOne(Blog);

exports.uploadImages = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  validateMongoDbId(id);

  try {
    const uploader = (path) => cloudinaryUploadImg(path, 'images');
    const urls = [];
    const files = req.files;

    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      fs.unlinkSync(path);
    }

    const findblog = await Blog.findByIdAndUpdate(
      blogId,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      { new: true }
    );

    res.json(findblog);
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
});
