import express from "express"
import { createCategory, deleteCategory, getAllCategories, getPostByCategory, updateCategory, } from "../../controllers/blog/categoryController.js"
import { protect } from "../../middlewares/authMiddleware.js"

const router = express.Router()

// --- Routes public / guests ---
router.get("/", getAllCategories)
router.get("/:id/posts", getPostByCategory)

// --- Routes administrasi (memerlukan autentikasi) ---
router.post("/", protect, createCategory)
router.put("/:id", protect, updateCategory)
router.delete("/:id", protect, deleteCategory)

export default router