import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import app from './src/app.js';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`the server running on the port ${port}`);
});