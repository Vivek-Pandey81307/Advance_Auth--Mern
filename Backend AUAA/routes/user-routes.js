import express from 'express'
import { signup,login, verifytoken } from '../controllers/user-controller.js';
const router = express.Router();
router.post("/signup",signup);
router.post("/login",login);
router.get("/user",verifytoken)
export default router
