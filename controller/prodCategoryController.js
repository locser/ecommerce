const ProdCategory = require('../models/prodCategoryModel');
const factory = require('./handleFactory');

const asyncHandler = require('express-async-handler');

exports.createProdCategory = factory.createOne(ProdCategory);
exports.getAllProdCategory = factory.getAll(ProdCategory);
exports.getProdCategoryById = factory.getOne(ProdCategory);
exports.updateProdCategoryById = factory.updateOneById(ProdCategory);
exports.deleteProdCategory = factory.deleteOne(ProdCategory);
