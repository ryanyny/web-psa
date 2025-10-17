import express from "express"
import authRoutes from "./authRoutes.js"
import postRoutes from "./blog/postRoutes.js"
import uploadRoutes from "./blog/uploadRoutes.js"
import categoryRoutes from "./blog/categoryRoutes.js"
import commentRoutes from "./blog/commentRoutes.js"
import likeRoutes from "./blog/likeRoutes.js"
import bookmarkRoutes from "./blog/bookmarkRoutes.js"

const router = express.Router()

// Routes dasar / global
router.use("/auth", authRoutes)
router.use("/upload", uploadRoutes)

// Routes blog
router.use("/posts", postRoutes)
router.use("/categories", categoryRoutes)
router.use("/comments", commentRoutes)
router.use("/posts", likeRoutes)
router.use("/posts", bookmarkRoutes)

export default router