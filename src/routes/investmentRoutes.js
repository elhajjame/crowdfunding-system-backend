import { Router } from "express";
import { investInProject } from "../controllers/investmentController.js";
import protect from "../middlewares/authMiddleware.js";
import { balanceCheck, projectExist, statusCheck } from "../middlewares/projectMiddleware.js";
import { restrictTo } from "../middlewares/roleMiddleware.js";

const router = Router();
router.use(protect);

router
  .post('/invest/:projectId', projectExist, statusCheck, balanceCheck, investInProject)

export default router;
