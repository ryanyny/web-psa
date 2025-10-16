import express from 'express';
import multer from 'multer';
import path from 'path';
import applicantController from '../../controllers/screening/applicantController.js';

const router = express.Router();

// Konfigurasi Multer untuk penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Tentukan folder penyimpanan, pastikan folder ini ada
    cb(null, 'uploads/applicants/');
  },
  filename: (req, file, cb) => {
    // Buat nama file yang unik untuk menghindari tumpang tindih
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Route untuk membuat data pelamar baru
// Middleware 'upload.fields' akan menangani semua file yang dikirim dari form
router.post(
  '/',
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'cv', maxCount: 1 },
    { name: 'portfolio', maxCount: 1 },
    { name: 'identity', maxCount: 1 },
  ]),
  applicantController.createApplicant
);

// Route untuk mendapatkan semua data pelamar
router.get('/', applicantController.getAllApplicants);

// Route untuk mendapatkan data pelamar berdasarkan ID
router.get('/:id', applicantController.getApplicantById);

export default router;