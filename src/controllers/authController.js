import jwt, { decode } from 'jsonwebtoken';
import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';

const signinToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRED_IN
  });
};

const signup = catchAsync(async (req, res) => {

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    // role: req.body.role,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  const token = signinToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser
    }
  });

});

const login = catchAsync(async (req, res) => {
  try {
    // 1) check the email and password if exist
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(404).json({
        status: 'fail',
        message: 'please provide an email and password'
      });
    };
    const user = await User.findOne({ email }).select('+password');
    const correct = await user.correctPassword(password, user.password);

    if (!user || !correct) {
      return res.status(404).json({
        status: 'fail',
        message: 'incorrect email or password!'
      });
    };

    const token = signinToken(user._id);
    res.status(200).json({
      status: 'success',
      token
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message
    });
  };
});


export { signup, login };