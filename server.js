import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import adminRoutes from './routes/adminRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import sendApplicationRoutes from './routes/sendApplicationRoutes.js';
import jobPostRoutes from './routes/jobPostRoutes.js'
import personalDetailsRoutes from './routes/personalDetailsRoutes.js';
import adminPostRoutes from './routes/adminPostRoutes.js'
import cors from 'cors'
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware to parse JSON
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Contact routes
app.use('/api/admin', adminRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/sendApplication', sendApplicationRoutes);
app.use('/api/jobPost', jobPostRoutes);
app.use('/api/personal', personalDetailsRoutes);
app.use('/api/adminPost', adminPostRoutes);
app.use('/api/uploadImage', uploadRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
