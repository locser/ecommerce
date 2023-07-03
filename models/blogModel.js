const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      // index:true,
    },
    description: {
      type: String,
      required: true,
      // unique:true,
    },
    category: {
      type: String,
      required: true,
      // unique:true,
    },
    numViews: {
      type: Number,
      required: true,
    },
    isLiked: {
      type: Boolean,
      default: false,
      // required:true,
      // unique:true,
    },
    isDisLiked: {
      type: String,
      default: false,
      // required:true,
      // unique:true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    image: [],

    author: {
      type: String,
      default: 'Admin',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },

    toObject: {
      virtuals: true,
    },

    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model('Blog', blogSchema);
