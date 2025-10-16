import express from "express"
import authMiddleware from "../../middlewares/authMiddleware.js"
import { getLikes, toggleLike } from "../../controllers/blog/likeController.js"

const router = express.Router()

router.get("/:id/likes", authMiddleware, getLikes)
router.post("/:id/likes/toggle", authMiddleware, toggleLike)

export default router