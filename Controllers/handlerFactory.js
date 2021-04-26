/* eslint-disable prettier/prettier */
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndRemove(req.params.id);
    if (!document) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: 'success',
      data: null,
    });
  });


exports.updateOne = Model => catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!document) {
      return next(new AppError('No Document find with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        data: document,
      },
    });
  });

exports.createOne = Model => catchAsync(async (req, res, next) => {
  const document = await Model.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: document,
    },
  });
});

exports.getOne = (Model, populateOptions) => catchAsync(async (req, res, next) => {
  let query = Model.findById(req.params.id);
  if(populateOptions) query = query.populate(populateOptions);
  const document = await query;

  if (!document) {
    return next(new AppError('No Document find with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: document,
    },
  });
});