// controllers/adminPostController.js
import AdminPost from '../models/adminPost.js';
import { sendEmail, sendEmailClient, sendEmailEmployers } from './sendMail.js';

// Create a new Admin Post
export const createAdminPost = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, email, pdf } = req.body;

        // Check if email already exists
        // const existingPost = await AdminPost.findOne({ email });
        // if (existingPost) {
        //     return res.status(400).json({ message: 'Email already exists' });
        // }

        const newAdminPost = new AdminPost({
            firstName,
            lastName,
            phoneNumber,
            email,
            pdf,
        });

        await newAdminPost.save();
        sendEmailClient(newAdminPost)
        
        res.status(201).json(newAdminPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating admin post', error });
    }
};

// Get all Admin Posts
export const getAllAdminPosts = async (req, res) => {
    try {
        const adminPosts = await AdminPost.find();
        res.status(200).json(adminPosts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admin posts', error });
    }
};

// Get a single Admin Post by ID
export const getAdminPostById = async (req, res) => {
    try {
        const adminPost = await AdminPost.findById(req.params.id);
        if (!adminPost) {
            return res.status(404).json({ message: 'Admin post not found' });
        }
        res.status(200).json(adminPost);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admin post', error });
    }
};

// Update an Admin Post by ID
export const updateAdminPost = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, email, pdf } = req.body;
        const adminPost = await AdminPost.findByIdAndUpdate(
            req.params.id,
            { firstName, lastName, phoneNumber, email, pdf },
            { new: true } // Return the updated document
        );

        if (!adminPost) {
            return res.status(404).json({ message: 'Admin post not found' });
        }

        res.status(200).json(adminPost);
    } catch (error) {
        res.status(500).json({ message: 'Error updating admin post', error });
    }
};


export const toggeled = async(req,res)=>{
    try {
     const { id } = req.params;
    

     // Find the admin by ID
     let admin = await AdminPost.findById(id);
     if(admin.status ==='Active'){
         admin.status = "Inactive";
     }
     else{
         admin.status = "Active"
     }



   const updatedAdmin =  await admin.save();


     if(updatedAdmin){
         res.status(201).send({
             success: true,
             message: "Vacany Status updated",
             updatedAdmin
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

// Delete an Admin Post by ID
export const deleteAdminPost = async (req, res) => {
    try {
        const adminPost = await AdminPost.findByIdAndDelete(req.params.id);
        if (!adminPost) {
            return res.status(404).json({ message: 'Admin post not found' });
        }
        res.status(200).json({ message: 'Admin post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting admin post', error });
    }
};



export const dropEmailUniqueIndex = async (req, res) => {
    try {
      // Drop the unique index on the 'email' field
      const result = await AdminPost.collection.dropIndex('email_1');
      res.status(200).json({ message: 'Unique index on email field dropped', result });
    } catch (error) {
      console.error('Error dropping unique index', error);
      res.status(500).json({ error: 'Failed to drop unique index' });
    }
  };