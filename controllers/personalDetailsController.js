// controllers/personalDetailsController.js
import Job from '../models/jobPostModol.js';
import PersonalDetails from '../models/PersonalDetails.js';
import { sendEmailEmployers, sendEmailJobApplicants, sendEmailJobToAdmin } from './sendMail.js';

// @desc    Create new personal details entry
// @route   POST /api/personal-details
// @access  Public

// companyName:{
//   type:String,
// },

// jobTitle:{
//   type:String,
// },


// companyName1:{
//   type:String,
// },


// drivingLicenseCategory:{
//   type:String,
// },



export const createPersonalDetails = async (req, res) => {
  try {
    const {
     
      jobTitle,
      companyName1,
      jobTitle1,
      DOS,
      RFL,
      HAW,
      day,
      WorkE,
      WorkN,
      startTime,
      finishTime,
      highEducatioin,
      companyName,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      countryOfResidence,
      phoneNumber,
      email,
      dutchPassport,
      driversLicense,
      drivingLicenseCategory,
      ownVehicle,
      currentlyEmployed,
      job
    } = req.body;

    const newDetails = new PersonalDetails({
      jobTitle,
      companyName1,
      jobTitle1,
      DOS,
      RFL,
      HAW,
      day,
      WorkE,
      WorkN,
      startTime,
      finishTime,
      highEducatioin,
      companyName,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      countryOfResidence,
      phoneNumber,
      email,
      dutchPassport,
      driversLicense,
      drivingLicenseCategory,
      ownVehicle,
      currentlyEmployed,
      job
    });

    await newDetails.save();

    const jobDetails = await Job.findById(job)
        sendEmailJobApplicants(newDetails,jobDetails)
        sendEmailEmployers(newDetails,jobDetails)
        sendEmailJobToAdmin(newDetails,jobDetails)
    res.status(201).json(newDetails);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all personal details
// @route   GET /api/personal-details
// @access  Public
export const getPersonalDetails = async (req, res) => {
  try {
    const details = await PersonalDetails.find().populate('job');
    res.status(200).json(details);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};



export const toggeled = async(req,res)=>{
  try {
   const { id } = req.params;
  

   // Find the admin by ID
   let details = await PersonalDetails.findById(id);
   if(details.status ==='Active'){
    details.status = "Inactive";
   }
   else{
    details.status = "Active"
   }



 const updateddetails =  await details.save();


   if(updateddetails){
       res.status(201).send({
           success: true,
           message: "details Status updated",
           updateddetails
         });
   }
   
  } catch (error) {
   res.status(500).send({
       success: false,
       message: "Errro in updating details status",
       error,
     });
  }
}


export const dropEmailUniqueIndex = async (req, res) => {
  try {
    // Drop the unique index on the 'email' field
    const result = await PersonalDetails.collection.dropIndex('email_1');
    res.status(200).json({ message: 'Unique index on email field dropped', result });
  } catch (error) {
    console.error('Error dropping unique index', error);
    res.status(500).json({ error: 'Failed to drop unique index' });
  }
};