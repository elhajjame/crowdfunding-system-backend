import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
  let token, decoded;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }
  if (!token) {
    return res.status(401).json({
      status: 'fail',
      message: 'you are not logged in! please log-in to get access'
    });
  };

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({
      status: 'fail',
      message: 'invalid token please log-in again'
    });
  }

  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return res.status(401).json({
      status: 'fail',
      message: 'the user belonging to token does no longer exist'
    })
  }
  req.user = freshUser;
  console.log(req.user);
  next()
};

export default protect;