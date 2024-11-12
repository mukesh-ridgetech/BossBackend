import Job from '../models/jobPostModol.js';
import SendApplication from '../models/sendApplicationModel.js';
import {sendEmail, sendEmailEmployers, sendEmailJobApplicants, sendEmailJobToAdmin} from './sendMail.js'

// Create a new contact entry
export const createSendApplication = async (req, res) => {
    try {
        const { firstName, lastName, phoneNumber, email, pdf,job } = req.body;

        const newSendApplication = new SendApplication({ firstName, lastName, phoneNumber, email, pdf ,job});
        await newSendApplication.save();
           

        const jobDetails = await Job.findById(job)
        sendEmailJobApplicants(newSendApplication,jobDetails)
        sendEmailEmployers(newSendApplication,jobDetails)
        sendEmailJobToAdmin(newSendApplication,jobDetails)

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
        const sendApplications = await SendApplication.find({}).populate('job');
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




export const toggeled = async(req,res)=>{
    try {
  
     const { id } = req.params;
    
  
     // Find the admin by ID
     let application = await SendApplication.findById(id);
     if(application.status ==='Active'){
        application.status = "Inactive";
     }
     else{
        application.status = "Active"
     }
  
  
  
   const newapplication =  await application.save();
  
  
     if(newapplication){
         res.status(201).send({
             success: true,
             message: "Application Status updated",
             newapplication
           });
     }
     
    } catch (error) {
     res.status(500).send({
         success: false,
         message: "Errro in updating Application status",
         error,
       });
    }
  }
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
