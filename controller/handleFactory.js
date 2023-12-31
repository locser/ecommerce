const asyncHandler = require('express-async-handler');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(Object(req.params.id));
    //if tour is null -> error
    if (!doc) {
      return next(new AppError('No found with that ID', 404));
    }

    res.json({
      status: 'success',
      data: null,
    });
  });

exports.updateOneById = (Model) => async (req, res, next) => {
  await Model.findByIdAndUpdate(
    Object(req.params.id),
    req.body,
    {
      new: true,
      runValidators: true,
    },
    (error, doc) => {
      if (error) {
        res.status(500).json({
          status: 'Failed to update',
          message: error.message,
        });
      } else {
        res.json({
          status: 'success',
          data: doc,
        });
      }
    }
  );
};

exports.createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.json({
      status: 'success',
      data: doc,
    });
  });

exports.getOne = (Model, popOptions) =>
  asyncHandler(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    //if tour is null -> error
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.json({
      status: 'success',
      data: doc,
    });
  });

exports.getAll = (Model) =>
  asyncHandler(async (req, res) => {
    // To allow for nested get Reviews on tour
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };

    //execute final query
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    // const features = new APIFeatures(Tour.find(), req.query);
    const doc = await features.query;

    res.json({
      status: 'success',
      // requestedAt: req.requestTime,
      length: doc.length,
      data: {
        data: doc,
      },
    });
  });
