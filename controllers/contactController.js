import Contact from '../models/contactModel.js';
import {sendEmail, sendEmailToAdmin} from './sendMail.js'

// Create a new contact entry
export const createContact = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, email, question } = req.body;

        const newContact = new Contact({ firstName, lastName, phoneNumber, email, question });
        await newContact.save();

        if(newContact){
            sendEmail(newContact)
            sendEmailToAdmin(newContact)
        }

        res.status(201).json({
            success: true,
            message: 'Contact created successfully',
            contact: newContact,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating contact',
            error: error.message,
        });
    }
};
















export const toggeled = async(req,res)=>{
    try {
     const { id } = req.params;
    

     // Find the admin by ID
     let contact = await Contact.findById(id);
     if(contact.status ==='Active'){
        contact.status = "Inactive";
     }
     else{
        contact.status = "Active"
     }



   const updatedcontact =  await contact.save();


     if(updatedcontact){
         res.status(201).send({
             success: true,
             message: "Contact Status updated",
             updatedcontact
           });
     }
     
    } catch (error) {
     res.status(500).send({
         success: false,
         message: "Errro in updating Vacancy status",
         error,
       });
    }
}

// Get all contact entries
export const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({});
        res.status(200).json({
            success: true,
            contacts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching contacts',
            error: error.message,
        });
    }
};

// Get a single contact by ID
export const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found',
            });
        }

        res.status(200).json({
            success: true,
            contact,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching contact',
            error: error.message,
        });
    }
};

// Update a contact entry by ID
export const updateContact = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, email, question } = req.body;
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { firstName, lastName, phoneNumber, email, question },
            { new: true, }
        );

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Contact updated successfully',
            contact,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating contact',
            error: error.message,
        });
    }
};

// Delete a contact entry by ID
export const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Contact deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting contact',
            error: error.message,
        });
    }
};
