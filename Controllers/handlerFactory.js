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






