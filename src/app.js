import morgan from "morgan";
import express from 'express';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(express.json());

app.use(morgan('dev'));

app.use('/users', authRoutes);

app.all('*splat', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `can't find ${req.originalUrl} on this server!`
  })
})
export default app;