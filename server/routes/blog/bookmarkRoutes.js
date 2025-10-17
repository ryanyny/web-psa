import express from "express"
import { getBookmarksForPost, getUserBookmarks, toggleBookmark, } from "../../controllers/blog/bookmarkController.js"
import authMiddleware from "../../middlewares/authMiddleware.js"

const router = express.Router()

// --- Routes administrasi (memerlukan autentikasi) ---
router.get("/user/bookmarks", authMiddleware, getUserBookmarks)
router.get("/:postId/bookmarks", authMiddleware, getBookmarksForPost)
router.post("/:postId/bookmarks/toggle", authMiddleware, toggleBookmark)

export default router