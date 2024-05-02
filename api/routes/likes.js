import express from "express";
import { addlike, removeLike, getLikes } from "../controllers/likes.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();
router.post("/addlike/:id", verifyToken, addlike);
router.delete("/:id", verifyToken, removeLike);
router.get("/:id", verifyToken, getLikes);
export default router;
