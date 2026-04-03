import AppError from "../utils/appError"

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(AppError(new 'you do not have the permission for this action'));
  }
}