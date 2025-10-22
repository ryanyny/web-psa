import express from "express"
import { createComment, deleteComment, getCommentsByPost, updateComment, } from "../../controllers/blog/commentController.js"
import { protect } from "../../middlewares/authMiddleware.js"

const router = express.Router()

// -- Routes public / guests ---
router.get("/:postId/comments", getCommentsByPost)

// --- Routes administrasi (memerlukan autentikasi) ---
router.post("/:postId/comments", protect, createComment)
router.put("/:id", protect, updateComment)
router.delete("/:id", protect, deleteComment)

export default router