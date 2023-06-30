const BlogCategory = require('../models/blogCategoryModel');
const factory = require('./handleFactory');

const asyncHandler = require('express-async-handler');

exports.createBlogCategory = factory.createOne(BlogCategory);
exports.getAllBlogCategory = factory.getAll(BlogCategory);
exports.getBlogCategoryById = factory.getOne(BlogCategory);
exports.updateBlogCategoryById = factory.updateOneById(BlogCategory);
exports.deleteBlogCategory = factory.deleteOne(BlogCategory);
