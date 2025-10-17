import express from "express"
import authMiddleware from "../../middlewares/authMiddleware.js"
import { getBookmarksForPost, getUserBookmarks, toggleBookmark } from "../../controllers/blog/bookmarkController.js"

const router = express.Router()

router.get("/user/bookmarks", authMiddleware, getUserBookmarks)
router.post("/:postId/bookmarks/toggle", authMiddleware, toggleBookmark)
router.get("/:postId/bookmarks", authMiddleware, getBookmarksForPost)

export default router