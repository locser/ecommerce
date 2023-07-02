const Brand = require('../models/prodCategoryModel');
const factory = require('./handleFactory');

const asyncHandler = require('express-async-handler');

exports.createBrand = factory.createOne(Brand);
exports.getAllBrand = factory.getAll(Brand);
exports.getBrandById = factory.getOne(Brand);
exports.updateBrandById = factory.updateOneById(Brand);
exports.deleteBrand = factory.deleteOne(Brand);
