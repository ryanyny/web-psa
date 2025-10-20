import express from "express"
import { getLikesForPost, toggleLike } from "../../controllers/blog/likeController.js"
import authMiddleware from "../../middlewares/authMiddleware.js"

const router = express.Router()

// --- Routes administrasi (memerlukan autentikasi) ---
router.get("/:id/likes", authMiddleware, getLikesForPost)
router.post("/:id/likes/toggle", authMiddleware, toggleLike)

export default router