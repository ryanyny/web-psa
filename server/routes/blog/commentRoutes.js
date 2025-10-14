import express from "express"
import authMiddleware from "../../middlewares/authMiddleware.js"
import { getCommentsByPost, createComment, deleteComment } from "../../controllers/blog/commentController.js"

const router = express.Router()

router.get("/:postId/comments", getCommentsByPost)
router.post("/:postId/comments", authMiddleware, createComment)
router.delete("/:id", authMiddleware, deleteComment)

export default router