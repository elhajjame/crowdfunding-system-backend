import morgan from "morgan";
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import AppError from "./utils/appError.js";
import globalErrorHandler from './middlewares/errorMiddleware.js'
import projectRoutes from './routes/projectRoutes.js'
const app = express();
app.use(express.json());

app.use(morgan('dev'));

app.use('/users', authRoutes);
app.use('/project', projectRoutes);

app.all('*splat', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `can't find ${req.originalUrl} on this server!`
  // });
  const err = new Error(`can't find ${req.originalUrl} on this server!`);
  err.status = 'fail';
  err.statusCode = 400;

  next(err)
});

app.use(globalErrorHandler)
export default app;