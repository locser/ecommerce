const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      // required: true,
      // unique:true,
      index: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      // required: true,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProdCategory',
    },
    // category: {
    //   type: String,
    //   required: true,
    // },
    quantity: {
      type: Number,
      // required: true,
    },
    images: {
      type: Array,
    },
    color: {
      type: String,
      enum: ['Black', 'White', 'Red', 'Other'],
    },
    //   ratingsAverage: {
    //     type: Number,
    //     default: 0,
    //     min: [0.0, 'Rating must be above 1.0'],
    //     max: [5.0, 'Rating must be below 5.0'],
    //     set: (val) => Math.round(val * 10) / 10, // 4.7777777 => 4.8
    //   },
    //   ratingsQuantity: {
    //     type: Number,
    //     default: 0,
    //   },

    ratings: [
      {
        star: Number,
        comment: String,
        postedby: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
    ratingsAverage: {
      type: Number,
      default: 0,
    },

    totalRatings: {
      type: String,
      default: 0,
    },

    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
      min: [0, 'Price must be above 0'],
      // max: [500000, 'Price must be below 500000'],
    },
    brand: {
      type: String,
      enum: ['Apple', 'Samsung', 'Lenovo'],
    },
    sold: {
      type: Number,
      defaultValue: 0,
    },
  },
  { timestamps: true }
);

productSchema.pre('save', function (next) {
  if (this.isModified('ratings')) {
    const sum = this.ratings.reduce((acc, rating) => acc + rating.star, 0);
    this.ratingsAverage = sum / this.ratings.length;
  }
  next();
});

//Export the model
module.exports = mongoose.model('Product', productSchema);
