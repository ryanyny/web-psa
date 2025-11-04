import express from 'express';
import emailController from '../../controllers/screening/emailController.js';

const router = express.Router();

// @route   POST /api/check-email
// @desc    Check if email exists
// @access  Public
router.post('/check-email', emailController.checkEmail);

export default router;