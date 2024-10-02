import { Router } from 'express';
import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  addComment
} from '../controllers/post.controller';

const router = Router();

router.post("/", createPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);
router.post("/:id/comments", addComment);

export default router;
