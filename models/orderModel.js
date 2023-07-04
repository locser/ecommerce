const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        count: Number,
        color: String,
      },
    ],
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: 'Not Processed',
      enum: [
        'Not Processed',
        'Processing',
        'Cancelled',
        'Dispatched',
        'Processed',
        'Cash on Delivery',
        'Delivered',
      ],
    },

    orderby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    shippingAddress: String,
    createdAt: Date,
    updatedAt: Date,
    // payment and payment methods
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model('Order', orderSchema);
