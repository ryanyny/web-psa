import express from 'express';
import { index, show, store, destroy } from '../../controllers/screening/applicantController.js';
import authMiddleware from "../../middlewares/authMiddleware.js"
import upload from '../../middlewares/upload.js';

const router = express.Router();

router.get('/', authMiddleware, index);
router.get('/:id', authMiddleware, show);
router.post('/', upload.single('photo'), store);
router.delete('/:id', authMiddleware, destroy);

export default router;