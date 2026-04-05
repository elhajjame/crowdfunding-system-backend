// routes/walletRoutes.js
import express from "express";
import { addBalance } from "../controllers/walletController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/add", protect, addBalance);

export default router;