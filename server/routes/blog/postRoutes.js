import express from "express"
import { createPost, getAllPosts, getPostById, updatePost, deletePost, } from "../../controllers/blog/postController.js"
import { protect } from "../../middlewares/authMiddleware.js"
import upload from "../../middlewares/upload.js"

const router = express.Router()

// -- Routes public / guests ---
router.get("/", getAllPosts)
router.get("/:id", getPostById)

// --- Routes administrasi (memerlukan autentikasi) ---
router.post("/", protect, upload.single("image"), createPost)
router.put("/:id", protect, upload.single("image"), updatePost)
router.delete("/:id", protect, deletePost)

export default router