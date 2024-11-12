import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
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
        // unique: true,
        // match: [/\S+@\S+\.\S+/, 'Invalid email format'],
    },
    question: {
        type: String,
        required: true,
    },

    status:{
        type:String,
        default:"Active"
    },
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
