import express from "express"
import { createPost, getAllPosts, getPostById, updatePost, deletePost, } from "../../controllers/blog/postController.js"
import authMiddleware from "../../middlewares/authMiddleware.js"
import upload from "../../middlewares/upload.js"

const router = express.Router()

// -- Routes public / guests ---
router.get("/", getAllPosts)
router.get("/:id", getPostById)

// --- Routes administrasi (memerlukan autentikasi) ---
router.post("/", authMiddleware, upload.single("image"), createPost)
router.put("/:id", authMiddleware, upload.single("image"), updatePost)
router.delete("/:id", authMiddleware, deletePost)

export default router