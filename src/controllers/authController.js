import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const signinToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRED_IN
  });
};

const signup = async (req, res) => {
  try {
    const nweUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      // role: req.body.role,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm
    });

    const token = signinToken(nweUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser
      }
    });

  } catch (error) {
    console.log(error);
    res.status(404).json({
      status: 'fail',
      message: error.message
    });
  };
};

export default signup;