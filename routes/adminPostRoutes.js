// routes/adminPostRoutes.js
import express from 'express';
import {
    createAdminPost,
    getAllAdminPosts,
    getAdminPostById,
    updateAdminPost,
    deleteAdminPost
} from '../controllers/adminPostController.js';
// ../controllers/adminPostController.js

const router = express.Router();

// Route to create a new admin post
router.post('/createAdminPost', createAdminPost);

// Route to get all admin posts
router.get('/getAllAdminPost', getAllAdminPosts);

// Route to get a specific admin post by ID
router.get('/:id', getAdminPostById);

// Route to update an admin post by ID
router.put('/:id', updateAdminPost);

// Route to delete an admin post by ID
router.delete('/:id', deleteAdminPost);

export default router;
