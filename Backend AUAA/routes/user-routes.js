import express from 'express'
import { signup } from '../controllers/user-controller.js';
const router = express.Router();
router.get("/signup",(req,res,next)=>{
    res.send("Hello World")
})
router.post("/signup",signup);
export default router
