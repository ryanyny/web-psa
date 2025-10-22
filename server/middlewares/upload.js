import multer from "multer"
import path from "path"

// Daftar ekstensi file gambar yang diizinkan untuk diunggah
const allowedExtensions = [".png", ".jpg", ".jpeg", ".webp"]

// --- Konfigurasi penyimpanan ---
const storage = multer.diskStorage({
    // Menentukan folder tujuan penyimpanan file yang diunggah
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    // Menentukan nama file setelah diunggah
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    },
})

// --- Fungsi filter file ---
const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()

    if (!allowedExtensions.includes(ext)) {
        return cb(
            new Error("Only image files are allowed (.png, .jpg, .jpeg, .webp")
        )
    }

    cb(null, true)
}

// --- Inisialisasi middleware multer ---
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
})

export default upload