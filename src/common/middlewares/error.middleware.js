const errorMiddleware = (err, req, res, next) => {
  console.error('Error details:', {
    message: err.message,
    stack: err.stack,
    status: err.status,
  });
  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message;
  res.status(status).json({ message });
};

module.exports = errorMiddleware;