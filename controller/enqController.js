const Enquiry = require('../models/enqModel');
const factory = require('./handleFactory');

const asyncHandler = require('express-async-handler');

exports.createEnquiry = factory.createOne(Enquiry);
exports.getAllEnquiry = factory.getAll(Enquiry);
exports.getEnquiryById = factory.getOne(Enquiry);
exports.updateEnquiryById = factory.updateOneById(Enquiry);
exports.deleteEnquiry = factory.deleteOne(Enquiry);
