const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var couponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true,
    upperCase: true,
  },
  expire: {
    type: Date,
    required: true,
  },
  disount: {
    type: Number,
    required: true,
  },
});

//Export the model
module.exports = mongoose.model('Coupon', couponSchema);
