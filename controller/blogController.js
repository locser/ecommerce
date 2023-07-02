const Blog = require('../models/blogModel');
const User = require('../models/userModel');
const factory = require('./handleFactory');

const asyncHandler = require('express-async-handler');

exports.createBlog = factory.createOne(Blog);
exports.getAllBlog = factory.getAll(Blog);
exports.getBlogById = factory.getOne(Blog);
exports.updateBlogById = factory.updateOneById(Blog);
exports.deleteBlog = factory.deleteOne(Blog);
