import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// router.get("/profile", authMiddleware, getProfile);

export default router;
