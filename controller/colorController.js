const Color = require('../models/colorModel');
const factory = require('./handleFactory');

const asyncHandler = require('express-async-handler');

exports.createColor = factory.createOne(Color);
exports.getAllColor = factory.getAll(Color);
exports.getColorById = factory.getOne(Color);
exports.updateColorById = factory.updateOneById(Color);
exports.deleteColor = factory.deleteOne(Color);
