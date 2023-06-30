const brand = require('../models/prodCategoryModel');
const factory = require('./handleFactory');

const asyncHandler = require('express-async-handler');

exports.createBrand = factory.createOne(brand);
exports.getAllBrand = factory.getAll(brand);
exports.getProdBrandById = factory.getOne(brand);
exports.updateProdBrandById = factory.updateOneById(brand);
exports.deleteBrand = factory.deleteOne(brand);
