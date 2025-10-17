import express from "express";
import { register, login, logout } from "../controllers/user.js";
import VerifyToken from "../middlewares/verifyToken.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/logout", VerifyToken, logout);
export default router;
