import express from 'express'
import { signup,login, verifyToken, getUser, refreshToken } from '../controllers/user-controller.js';
import { verify } from 'jsonwebtoken';
const router = express.Router();
router.post("/signup",signup);
router.post("/login",login);
router.get("/user",verifyToken,getUser)
router.get("/refresh",refreshToken,verifyToken,getUser)
export default router
