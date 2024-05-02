import express from "express";
import { showComments, addComments } from "../controllers/comments.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();
router.get("/:id", showComments);
router.post("/:id", verifyToken, addComments);
export default router;
