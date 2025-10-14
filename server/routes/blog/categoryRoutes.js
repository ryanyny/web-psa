import express from "express"
import { createCategory, deleteCategory, getAllCategories, getPostByCategory, updateCategory } from "../../controllers/blog/categoryController.js"
import authMiddleware from "../../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/", getAllCategories)
router.get("/:id/posts", getPostByCategory)
router.post("/", authMiddleware, createCategory)
router.put("/:id", authMiddleware, updateCategory)
router.delete("/:id", authMiddleware, deleteCategory)

export default router