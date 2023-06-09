const ErrorHandler = require("../utils/ErrorHandler");

const catchAsyncError = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      next(new ErrorHandler(err.message, 500));
    });
  };
};

module.exports = catchAsyncError;
