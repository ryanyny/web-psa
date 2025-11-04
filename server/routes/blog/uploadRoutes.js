import express from "express"
import upload from "../../middlewares/upload.js"

const router = express.Router()

// Routes untuk mengunggah file (gambar)
router.post("/", upload.single("image"), (req, res) => {
    const fileUrl = `uploads/${req.file.filename}`

    res.json({ url: fileUrl })
})

export default router