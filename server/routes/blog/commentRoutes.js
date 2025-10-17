import express from "express"
import { createComment, deleteComment, getCommentsByPost, updateComment, } from "../../controllers/blog/commentController.js"
import authMiddleware from "../../middlewares/authMiddleware.js"

const router = express.Router()

// -- Routes public / guests ---
router.get("/:postId/comments", getCommentsByPost)
router.post("/:postId/comments", authMiddleware, createComment)

// --- Routes administrasi (memerlukan autentikasi) ---
router.put("/:id", authMiddleware, updateComment)
router.delete("/:id", authMiddleware, deleteComment)

export default router