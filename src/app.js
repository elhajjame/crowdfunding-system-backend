import morgan from "morgan";
import express from 'express';
const app = express();
app.use(express.json());

app.use(morgan('dev'));

export default app;