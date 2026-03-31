import mongoose from "mongoose";
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, ''],
    required: [true, 'please tell your name']
  },

  email: {
    type: String,
    unique: [true, 'the name must be unique'],
    required: [true, 'please provide your email'],
    isLowercase: true,
    validate: [validator.isEmail, 'please enter a valid email']
  },
  // role: {
  //   type: String,
  //   enum: ['admin', 'user', 'investor'],
  //   default: 'user'
  // },
  password: {
    type: String,
    required: [true, 'please provide a password'],
    minlength: [6, 'the password must be more than 6 characters'],
    select: false
  },

  passwordConfirm: {
    type: String,
    require: [true, 'pleas confirm your password']
  }
});

const User = mongoose.model('User', userSchema);
export default User;