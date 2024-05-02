import express from "express";
import {
  addPost,
  getPosts,
  getPost,
  deletePost,
  updatePost,
} from "../controllers/post.controllers.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/addpost", verifyToken, addPost);
router.get("/", verifyToken, getPosts);
router.get("/:id", verifyToken, getPost);
router.delete("/:id", verifyToken, deletePost);
router.put("/:id", verifyToken, updatePost);

export default router;
