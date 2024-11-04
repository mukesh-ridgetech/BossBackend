// models/AdminPost.js
import mongoose from 'mongoose';
const adminPostSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    pdf: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const AdminPost = mongoose.model('AdminPost', adminPostSchema);

export default AdminPost;