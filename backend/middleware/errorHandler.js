const errorHandler = (err, req, res, next) => {
  const setStatusCode = res.statusCode ? res.statusCode : 500;

  res.status(setStatusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
