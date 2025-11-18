import express from "express"
import { protect, onlyAdmin } from "../middlewares/authMiddleware.js"
import { getDashboardStats, getAllUsers, deleteUser, updateUserRole, getAllPosts, deletePost } from "../controllers/adminController.js"

const router = express.Router()

router.use(protect, onlyAdmin)

router.get("/stats", getDashboardStats)

router.get("/users", getAllUsers)
router.put("/users/:id/role", updateUserRole)
router.delete("/users/:id", deleteUser)

router.get("/posts", getAllPosts)
router.delete("/posts/:id", deletePost)

export default router