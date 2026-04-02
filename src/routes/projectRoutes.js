import { Router } from "express";
import { createProject, getAllProjects } from "../controllers/projectController.js";
import protect from "../middlewares/authMiddleware.js";
const router = Router();

// router.use();

router
  .post('/create-project', protect, createProject)
  .get('/all-projects', protect, getAllProjects)

export default router;  