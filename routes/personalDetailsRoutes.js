// routes/personalDetailsRoutes.js
import express from 'express';
import { createPersonalDetails, dropEmailUniqueIndex, getPersonalDetails,toggeled } from '../controllers/personalDetailsController.js';

const router = express.Router();

// POST: Create personal details
router.post('/personal-details', createPersonalDetails);
router.patch('/toggled/:id',  toggeled);

// GET: Fetch all personal details
router.get('/get-details', getPersonalDetails);

router.delete('/drop-email-unique', dropEmailUniqueIndex);

export default router;
