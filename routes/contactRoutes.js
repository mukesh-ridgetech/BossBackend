import express from 'express';
import {
    createContact,
    getAllContacts,
    getContactById,
    updateContact,
    deleteContact
} from '../controllers/contactController.js';

const router = express.Router();

// POST: Create a new contact
router.post('/createContact', createContact);

// GET: Retrieve all contacts
router.get('/getAllContacts', getAllContacts);

// GET: Retrieve a contact by ID
router.get('/getContactById/:id', getContactById);

// PUT: Update a contact by ID
router.put('/updateContact/:id', updateContact);

// DELETE: Delete a contact by ID
router.delete('/deleteContact/:id', deleteContact);

export default router;
