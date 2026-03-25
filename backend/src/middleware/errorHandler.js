function notFoundHandler(req, res) {
  return res.status(404).json({ message: 'Not Found' });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const statusCode = Number(err.statusCode) || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode).json({ message });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
