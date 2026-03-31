import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config({ path: './config.env' })

mongoose.connect(process.env.DB_CONNECT)
  .then((con) => {
    console.log('database connected successfully');
  })