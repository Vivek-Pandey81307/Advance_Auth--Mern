import express from 'express'
import { signup } from '../controllers/user-controller';
const router = express.Router();
router.post("/signup",signup);
module.exports = router;