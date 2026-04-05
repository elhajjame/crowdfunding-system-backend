import { Router } from "express";
import { createProject, deleteProject, getAllProjects, getProject, updateProject, } from "../controllers/projectController.js";
import protect from "../middlewares/authMiddleware.js";
import { projectExist } from "../middlewares/projectMiddleware.js";
import { ownerShip } from "../middlewares/ownerShip.js";
import { restrictTo } from "../middlewares/roleMiddleware.js";
const router = Router();

router.use(protect);

router
  .post('/create-project', createProject)
  .get('/all', getAllProjects)
  .get('/get-one/:id', getProject)
  .put('/update/:id', restrictTo('admin'), projectExist, ownerShip, updateProject)
  .delete('/delete', ownerShip, deleteProject)

export default router;