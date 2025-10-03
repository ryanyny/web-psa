import express from "express"
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from "../controllers/postController.js"
import authMiddleware from "../middlewares/authMiddleware.js"
import upload from "../middlewares/upload.js"

const router = express.Router()

router.get("/", getAllPosts)
router.get("/:id", getPostById)
router.post("/", authMiddleware, upload.single("coverImage"), createPost)
router.put("/:id", authMiddleware, upload.single("coverImage"), updatePost)
router.delete("/:id", authMiddleware, deletePost)

export default router