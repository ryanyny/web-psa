import express from "express"
import { getLikesForPost, toggleLike } from "../../controllers/blog/likeController.js"
import { protect } from "../../middlewares/authMiddleware.js"

const router = express.Router()

// --- Routes administrasi (memerlukan autentikasi) ---
router.get("/:id/likes", protect, getLikesForPost)
router.post("/:id/likes/toggle", protect, toggleLike)

export default router