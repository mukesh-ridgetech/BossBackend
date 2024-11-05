import express from 'express';
import { sendEmail } from '../controllers/emailController.js';

const router = express.Router();

// POST route to send email
router.post('/send-email', sendEmail);

export default router;
