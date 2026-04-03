import mongoose from "mongoose";
import { Project } from "../models/projectModel.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

export const projectExist = catchAsync(async function (req, res, next) {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id))
    return next(new AppError('invalid Id', 400));

  const project = await Project.findById(id)
  if (!project) {
    return next(new AppError('project not found', 404));
  };
  next();
});
