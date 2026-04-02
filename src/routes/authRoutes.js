import { Router } from "express";
import { signup, login } from '../controllers/authController.js';
console.log(login);
const router = Router();

router
  .post('/signup', signup)
  .post('/login', login);

export default router;  