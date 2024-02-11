import express from 'express'
import { signup,login, verifyToken, getUser, refreshToken,logout } from '../controllers/user-controller.js';
const router = express.Router();
router.post("/signup",signup);
router.post("/login",login);
router.get("/user",verifyToken,getUser)
router.get("/refresh",refreshToken,verifyToken,getUser)
router.post("/logout",verifyToken,logout)
export default router
