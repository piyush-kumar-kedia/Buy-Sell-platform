import express from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "./controller.js";
import { authenticateToken } from "../middleware/authController.js";

const router = express.Router();

router.get("/me", authenticateToken, getCurrentUser);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

export default router;
