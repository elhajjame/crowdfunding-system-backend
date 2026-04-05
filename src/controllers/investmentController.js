// controllers/investmentController.js
import Investment from "../models/investmentModel.js";
import Project from "../models/projectModel.js";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

// Create investment
export const investInProject = catchAsync(async (req, res, next) => {

  const { amount } = req.body;
  const projectId = req.params.projectId;

  const project = await Project.findById(projectId);
  const user = await User.findById(req.user.id);
  console.log(project);
  //  max 50% rule
  const maxAllowed = project.capital * 0.5;
  if (amount > maxAllowed)
    return next(new AppError('Cannot invest more than 50%', 400))

  const investment = await Investment.create({
    // user: user._id,
    project: project._id,
    investor: req.user.id,
    amount
  });

  // update project amount
  project.currentAmount += amount;

  // auto close project
  if (project.currentAmount === project.capital)
    project.status = "closed";

  await project.save();
  //update user balance
  user.balance -= amount;
  await user.save();

  res.status(201).json({
    status: 'success',
    message: "Investment successful",
    data: {
      investment
    }
  });

});