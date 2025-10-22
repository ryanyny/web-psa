import express from "express"
import { getBookmarksForPost, getUserBookmarks, toggleBookmark, } from "../../controllers/blog/bookmarkController.js"
import { protect } from "../../middlewares/authMiddleware.js"

const router = express.Router()

// --- Routes administrasi (memerlukan autentikasi) ---
router.get("/user/bookmarks", protect, getUserBookmarks)
router.get("/:postId/bookmarks", protect, getBookmarksForPost)
router.post("/:postId/bookmarks/toggle", protect, toggleBookmark)

export default router