const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');
const AppError = require('../utils/appError');
const factory = require('./handleFactory');
const User = require('../models/userModel');

const fs = require('fs');
const validateMongoDbId = require('../utils/validateMongodbId');
const cloudinaryUploadImg = require('../utils/cloudinary');

exports.getAllProduct = factory.getAll(Product);
exports.getProductById = factory.getOne(Product);
exports.createProduct = factory.createOne(Product);
exports.updateProductById = factory.updateOneById(Product);
exports.deleteProduct = factory.deleteOne(Product);

exports.getProductCategory = asyncHandler(async (req, res) => {
  const productCategory = await Product.aggregate([
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
      },
    },
  ]);
  res.json({
    status: 'success',
    data: productCategory,
  });
});

exports.addToWishList = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;

  try {
    //get current user and get product wishlists
    let user = User.findById({ _id: _id });
    const alreadyAdded = user.wishlist.includes(productId);

    if (alreadyAdded) {
      user = await User.findByIdAndUpdate(
        { _id: _id },
        {
          $push: { wishlistId: productId },
        },
        { new: true }
      );
    } else {
      user = await User.findByIdAndUpdate(
        { _id: _id },
        {
          $pull: { wishlistId: productId },
        },
        { new: true }
      );
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    throw new AppError('Add to wish list failed!');
  }
});

exports.rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, productId } = req.body;
  try {
    const product = await Product.findById(productId);

    let alreadyRated = product.ratings.some(
      (rating) => rating.postedby.toString() === _id.toString()
    );

    if (alreadyRated) {
      // Người dùng đã đánh giá sản phẩm
      // update the rating
      const updatedRating = await Product.updateOne(
        { _id: product._id },
        {
          // $set: {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        },
        { new: true }
      );
      // res.json(updatedRating);
    } else {
      // Người dùng chưa đánh giá sản phẩm
      rateProduct = await Product.findByIdAndUpdate(
        { _id: product._id },
        {
          $push: {
            rating: {
              star: star,
              comment: comment,
              postedby: _id,
            },
          },
        },
        { new: true }
      );
      // res.json(rateProduct);
    }

    const allRatings = await Product.findById(productId);

    let totalRatings = allRatings.ratings.length;
    // let ratingsum = allRatings.ratings
    //   .map((rat) => rat.star)
    //   .reduce((pre, curr) => pre + curr, 0);
    // .reduce((sum, rating) => sum + rating, 0);
    const ratingSum = allRatings.ratings.reduce(
      (sum, rating) => sum + rating.star,
      0
    );

    let actualRatings = Math.round(ratingsum / totalRatings);
    let finalproduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualRatings,
      },
      { new: true }
    );
    finalproduct.ratingsAverage = ratingSum;
    res.json(finalproduct);
  } catch (err) {}
  console.log(err);
  new AppError('Rating failed');
});

exports.uploadImages = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  validateMongoDbId(id);

  try {
    const uploader = (path) => cloudinaryUploadImg(path, 'images');
    const urls = [];
    const files = req.files;

    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      fs.unlinkSync(path);
    }

    const findProduct = await Product.findByIdAndUpdate(
      productId,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      { new: true }
    );

    res.json(findProduct);
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
});
// exports.getAllRating =
