import mongoose from "mongoose";
import Project from "../models/projectModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";
import User from "../models/userModel.js";


export const projectExist = catchAsync(async function (req, res, next) {
  const { projectId } = req.params
  console.log(projectId);
  if (!mongoose.Types.ObjectId.isValid(projectId))
    return next(new AppError('invalid Id', 400));

  const project = await Project.findById(projectId);

  if (!project) {
    return next(new AppError('project not found', 404));
  };

  next();
});

export const statusCheck = catchAsync(async (req, res, next) => {
  const { projectId } = req.params
  const project = await Project.findById(projectId);

  if (project.status === 'closed')
    return next(new AppError('the project already closed'))

  next();
});

export const balanceCheck = catchAsync(async (req, res, next) => {

  const { amount } = req.body;
  const userId = req.user.id;

  const user = await User.findById(userId);

  if (!user)
    return next(new AppError('User not found', 404));

  if (user.balance < amount)
    return next(new AppError('Not enough balance', 400));

  next();
});

export const checkRemaining = catchAsync(async (req, res, next) => {
  const { amount } = req.body;
  const { projectId } = req.params.id;

  const project = await Project.findById(projectId);

  const remaining = project.capital - project.currentAmount;

  if (amount > remaining)
    return next(new AppError('amount exceeds remaining capital', 400));

  next();
});
