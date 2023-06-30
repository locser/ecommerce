const Blog = require('../models/blogModels');
const User = require('../models/userModels');
const factory = require('./handleFactory');

const asyncHandler = require('express-async-handler');

exports.createBlog = factory.createOne(Blog);
exports.getAllBlogs = factory.getAll(Blog);
exports.getBlogById = factory.getOne(Blog);
exports.updateBlogById = factory.updateOneById(Blog);
exports.deleteBlog = factory.deleteOne(Blog);
