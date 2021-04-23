/* eslint-disable no-multi-assign */
/* eslint-disable arrow-body-style */
// eslint-disable-next-line no-undef
module.exports = catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};
