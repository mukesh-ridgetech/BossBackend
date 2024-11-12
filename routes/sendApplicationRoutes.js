import express from 'express';
import {
    createSendApplication,
    getAllSendApplication,
    getSendApplicationById,
    updateSendApplication,
    deleteSendApplication,
    toggeled,
    dropEmailUniqueIndex
} from '../controllers/sendApplicationController.js';

const router = express.Router();

// POST: Create a new SendApplication
router.post('/createSendApplication', createSendApplication);

// GET: Retrieve all SendApplication
router.get('/getAllSendApplication', getAllSendApplication);

// GET: Retrieve a SendApplication by ID
router.get('/getSendApplicationById/:id', getSendApplicationById);

// PUT: Update a SendApplication by ID
router.put('/updateSendApplication/:id', updateSendApplication);
router.patch('/toggled/:id', toggeled);

// DELETE: Delete a SendApplication by ID
router.delete('/deleteSendApplication/:id', deleteSendApplication);

router.delete('/drop-email-unique', dropEmailUniqueIndex);

export default router;
