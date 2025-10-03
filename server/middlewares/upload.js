import multer from "multer"
import path from "path"

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

const upload = multer({ storage })

export default upload