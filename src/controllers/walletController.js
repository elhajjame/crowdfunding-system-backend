import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const addBalance = catchAsync(async (req, res, next) => {
  let { amount } = req.body;

  amount = Number(amount);
  if (!amount || amount <= 0) {
    return next(new AppError("Invalid amount", 400));
  }

  const user = await User.findById(req.user.id);
  if (!user) return next(new AppError("User not found", 404));

  user.balance += amount;
  await user.save();

  res.status(200).json({
    status: "success",
    message: `Balance updated successfully!`,
    balance: user.balance
  });
});