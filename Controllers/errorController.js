module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // Use status code provided by err object or use 500 which means internal server error
  err.status = err.status || 'error'; // Use status provided by err object or use 'error' by default
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
