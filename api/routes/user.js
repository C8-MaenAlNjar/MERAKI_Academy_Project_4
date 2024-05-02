import express from "express";
import {
  login,
  register,
  logout,
  updateUser,
} from "../controllers/user.controllers.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/:id", verifyToken, updateUser);

export default router;
