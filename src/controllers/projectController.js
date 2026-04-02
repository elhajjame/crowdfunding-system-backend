import { Project } from "../models/projectModel.js";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

const createProject = catchAsync(async (req, res, next) => {
  const {
    title,
    description,
    capital,
    maxInvestmentPercentage,
    initialInvestment
  } = req.body

  if (!title || !description || !capital || !maxInvestmentPercentage || !initialInvestment) {
    return next(new AppError('please provide all required fields', 404))
  };

  if (initialInvestment > capital) {
    return next(new AppError('initial investment cannot exceed project capital'));
  }

  const newProject = await Project.create({
    owner: req.user.id,
    title,
    description,
    capital,
    maxInvestmentPercentage,
    initialInvestment,
    status: initialInvestment >= capital ? 'closed' : 'open',
    createdAt: new Date(),
  });

  res.status(201).json({
    status: 'success',
    message: 'Project created successfully',
    project: {
      newProject
    }
  });
});

const getAllProjects = catchAsync(async (req, res, next) => {
  const project = await Project.find({ owner: req.user._id });

  if (project.length === 0) {
    return next(new AppError('cannot find projects', 404));
  };
  res.status(202).json({
    status: 'success',
    data: {
      project
    }
  })
});

export { createProject, getAllProjects };