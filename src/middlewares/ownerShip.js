import AppError from "../utils/appError.js";
import { Project } from "../models/projectModel.js";
import catchAsync from "../utils/catchAsync.js";

export const ownerShip = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (project.owner.toString() !== req.user._id.toString()) {
    return next(new AppError('Access denied — not your resource', 403))
  }
  next();
})

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5Y2ZkNTVjZTNlNTg4MGM4YTA5ODBkMSIsImlhdCI6MTc3NTIyODI1MiwiZXhwIjoxNzc3ODIwMjUyfQ.tQLvnf_fELovyRbUDUgSOO5IFREAiwzdzH - Xq5BsLEg