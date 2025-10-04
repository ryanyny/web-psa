import multer from "multer"
import path from "path"

// Ekstensi yang valid
const allowedExtensions = [".png", ".jpg", ".jpeg", ".webp"]

// Konfigurasi tempat penyimpanan file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/") // Semua file disimpan di folder "uploads"
    },
    filename: (req, file, cb) => {
        // Rename file menggunakan timestamp dan ambil ekstensi aslinya
        cb(null, Date.now() + path.extname(file.originalname))
    },
})

// Filter tipe file
const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    if (!allowedExtensions.includes(ext)) {
        return cb(new Error("Only image files are allowed (.png, .jpg, .jpeg, .webp"))
    }

    cb(null, true)
}

// Multer config
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
})

export default upload