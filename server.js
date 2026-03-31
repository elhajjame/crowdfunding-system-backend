// import dotenv from 'dotenv';
// dotenv.config({ path: './config.env' });
// import app from './src/app.js';

// const port = process.env.PORT || 3000;

// app.listen(port, () => {
//   console.log(`the server running on the port ${port}`);
// });

import dotenv from 'dotenv';
import app from './src/app.js';
import mongoose from 'mongoose';

dotenv.config({ path: './config.env' });

mongoose.connect(process.env.DB_CONNECT).then((con) => {
  console.log('database connected successfully');
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`the server running on the port ${port}`);
});