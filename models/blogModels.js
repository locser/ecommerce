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
    image: {
      type: String,
      default:
        'https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy_335657-2386.jpg?w=740&t=st=1688114059~exp=1688114659~hmac=841711e3ca5ae29f1d862c31eac4922989782f78331a92fbfbe94ea0b8ddeae0',
    },

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
