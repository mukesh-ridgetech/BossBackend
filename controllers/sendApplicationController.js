import SendApplication from '../models/sendApplicationModel.js';

// Create a new contact entry
export const createSendApplication = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, email, pdf } = req.body;

        const newSendApplication = new SendApplication({ firstName, lastName, phoneNumber, email, pdf });
        await newSendApplication.save();

        res.status(201).json({
            success: true,
            message: 'SendApplication created successfully',
            sendApplication: newSendApplication,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating SendApplication',
            error: error.message,
        });
    }
};

// Get all SendApplication entries
export const getAllSendApplication = async (req, res) => {
    try {
        const sendApplications = await SendApplication.find({});
        res.status(200).json({
            success: true,
            sendApplications,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching sendApplications',
            error: error.message,
        });
    }
};

// Get a single contact by ID
export const getSendApplicationById = async (req, res) => {
    try {
        const sendApplication = await SendApplication.findById(req.params.id);
        if (!sendApplication) {
            return res.status(404).json({
                success: false,
                message: 'SendApplication not found',
            });
        }

        res.status(200).json({
            success: true,
            sendApplication,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching SendApplication',
            error: error.message,
        });
    }
};

// Update a contact entry by ID
export const updateSendApplication = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, email, pdf } = req.body;
        const sendApplication = await SendApplication.findByIdAndUpdate(
            req.params.id,
            { firstName, lastName, phoneNumber, email, pdf },
            { new: true, }
        );

        if (!sendApplication) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'sendApplication updated successfully',
            sendApplication,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating SendApplication',
            error: error.message,
        });
    }
};

// Delete a contact entry by ID
export const deleteSendApplication = async (req, res) => {
    try {
        const sendApplication = await SendApplication.findByIdAndDelete(req.params.id);

        if (!sendApplication) {
            return res.status(404).json({
                success: false,
                message: 'SendApplication not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'SendApplication deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting SendApplication',
            error: error.message,
        });
    }
};
