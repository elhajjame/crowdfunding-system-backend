//by specifying 4 parameters express automatically knows this function is an error handling middleware
const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error'
  console.error("🔥 ERROR 💥", err);

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message
  })
}

export default errorMiddleware;