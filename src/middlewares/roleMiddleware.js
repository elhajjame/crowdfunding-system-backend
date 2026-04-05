import AppError from "../utils/appError.js"

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new AppError('you do not have the permission for this action'));
  }
};