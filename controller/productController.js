const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const AppError = require('../utils/appError');
const factory = require('./handleFactory');

exports.getAllProduct = factory.getAll(Product);
exports.getProductById = factory.getOne(Product, { path: 'reviews' });
exports.createProduct = factory.createOne(Product);
exports.updateProductById = factory.updateOneById(Product);
exports.deleteProduct = factory.deleteOne(Product);

exports.getProductCategory = asyncHandler(async (req, res) => {
  const productCategory = await Product.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
      },
    },
  ]);
  res.json({
    status: 'success',
    data: productCategory,
  });
});
