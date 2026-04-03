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

const getProject = catchAsync(async (req, res, next) => {

  const project = await Project.findOne({
    _id: req.params.id,
    userId: req.user._id
  });

  if (project.length === 0) {
    return next(new AppError('there is no project with this id!', 404));
  };

  res.status(200).json({
    status: 'success',
    data: {
      project
    },
  });
});

const updateProject = catchAsync(async (req, res, next) => {
  const {
    title,
    description,
    capital,
    status,
    maxInvestmentPercentage
  } = req.body;

  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });

  const filteredBody = {
    title,
    description,
    capital,
    status,
    maxInvestmentPercentage
  };
  //copies filteredBody into project and overwriting
  Object.assign(project, filteredBody);
  await project.save();

  res.status(200).json({
    status: 'success',
    data: {
      project
    }
  });
});

const deleteProject = catchAsync(async (req, res, next) => {
  await Project.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'the project has been deleted successfully'
  })
})

export { createProject, getAllProjects, getProject, updateProject, deleteProject };