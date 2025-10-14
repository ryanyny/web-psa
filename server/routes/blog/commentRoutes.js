import express from "express"
import authMiddleware from "../../middlewares/authMiddleware.js"
import { getCommentsByPost, createComment, deleteComment, updateComment } from "../../controllers/blog/commentController.js"

const router = express.Router()

router.get("/:postId/comments", getCommentsByPost)
router.post("/:postId/comments", authMiddleware, createComment)
router.put("/:id", authMiddleware, updateComment)
router.delete("/:id", authMiddleware, deleteComment)

export default router