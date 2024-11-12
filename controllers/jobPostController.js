import { postToFacebookFeed } from '../middleware/jobPostingFb.js';
import Job from '../models/jobPostModol.js';

// Create a new job

// location: {
//   type: String,
//   required: true
// },
// category: {
//   type: String,
//   required: true
// },
// jobType: {
//   type: String,
//   required: true
// },
// upper_jd: {
//   type: [String],
//   required: true
// },

// jobName:{
//   type:String,
//   required:true
// },
// jobDescription:{
//   type:String,
//   required:true,
// },


// responsibilities: {
//   type: [String], 
//   required: true
// },

// requirements: {
//   type: [String], 
//   required: true
// },

// image:{
//   type:String,
//   required:true,
// },
// emails: {
//   type: String, 
//   required: true
// },
// phone:{
//   type:String,
//   required:true,
// },
// logo:{
//   type:String,
//   required:true,
// }
export const createJob = async (req, res) => {
  try {

    const { location, category, jobType, upper_jd, jobName,jobDescription,image,responsibilities ,phone,requirements,logo,email,agree} = req.body;
    const newJob = new Job({ location, category, jobType, upper_jd, jobName,jobDescription,image,responsibilities ,phone,requirements,logo,email});
    const savedJob = await newJob.save();

    if(agree){
      postToFacebookFeed(savedJob)
    }
    
    if(savedJob){
        res.status(201).json({
            success: true,
            message: 'jobPost created successfully',
            savedJob
        });
    }
    // res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({
        success: false,
        message: 'Error creating jobPost',
        error: error.message,
    });
  }
};

// Get all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();

    if (!jobs) return res.status(404).json({ message: 'Jobs not found' });

     if(jobs){
        res.status(201).json({
            success: true,
            message: 'jobPost fetch successfully',
            jobs
        });
     }
    // res.status(200).json(jobs);
  } catch (error) {
    // res.status(500).json({ error: err.message });
    res.status(500).json({
        success: false,
        message: 'Error fetching jobPost',
        error: error.message,
    });
  }
};

// Get job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if(job){
        res.status(201).json({
            success: true,
            message: 'jobPost fetch successfully',
            job
        });
     }
    
  } catch (error) {
    res.status(500).json({
        success: false,
        message: 'Error fetching jobPost',
        error: error.message,
    });
  }
};

// Update a job
export const updateJob = async (req, res) => {
  try {

    const { location, category, jobType, upper_jd, jobName,jobDescription,image,responsibilities ,phone,requirements,logo,email} = req.body
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, { location, category, jobType, upper_jd, jobName,jobDescription,image,responsibilities ,phone,requirements,logo,email}, { new: true });
    if (!updatedJob) return res.status(404).json({ message: 'Job not found' });

    res.status(201).json({
        success: true,
        message: 'jobPost update successfully',
        job:updatedJob
    });
    // res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({
        success: false,
        message: 'Error updating jobPost',
        error: error.message,
    });
  }
};



// filter job
export const filterJobs = async (req, res) => {
  try {
    const { keyword } = req.query;

    // If no keyword is provided, return all jobs
    if (!keyword) {
      const jobs = await Job.find({});
      return res.status(200).json(jobs);
    }
    // location, category, jobType, upper_jd, jobName,jobDescription,image,responsibilities ,phone,requirements,logo,email
    // Case-insensitive search: match the keyword in jobName or jobDescription
    const jobs = await Job.find({
      $or: [
        { jobName: { $regex: keyword, $options: 'i' } }, // Case-insensitive search for jobName
        { jobDescription: { $regex: keyword, $options: 'i' } }, // Case-insensitive search for jobDescription
        { location: { $regex: keyword, $options: 'i' } },
        { jobType: { $regex: keyword, $options: 'i' } },
        { category: { $regex: keyword, $options: 'i' } },
        { responsibilities: { $regex: keyword, $options: 'i' } },
        { requirements: { $regex: keyword, $options: 'i' } },
        { upper_jd: { $regex: keyword, $options: 'i' } },
        // requirements
      ]
    });

    if (jobs.length === 0) {
      return res.status(404).json({ message: 'No jobs found' });
    }

    res.status(201).json({
      success: true,
      message: 'jobPost Search successfully',
      job:jobs
  });

    // res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error Searching jobPost',
      error: error.message,
  });
  }
};


export const getFilteredJobs = async (req, res) => {
  try {
    const { search, category } = req.query;

    // Build the query object
    let query = {};

    // { jobType: { $regex: keyword, $options: 'i' } },
    // { category: { $regex: keyword, $options: 'i' } },
    // { responsibilities: { $regex: keyword, $options: 'i' } },
    // { requirements: { $regex: keyword, $options: 'i' } },
    // { upper_jd: { $regex: keyword, $options: 'i' } },

    // If search keyword is provided, use a case-insensitive regex search
    if (search) {
      const searchRegex = new RegExp(search, 'i'); // 'i' for case-insensitive search
      query.$or = [
        { jobName: { $regex: searchRegex } },
        { jobDescription: { $regex: searchRegex } },
        { location: { $regex: searchRegex } },
        { jobType: { $regex: searchRegex } },
        { category: { $regex: searchRegex } },
        { responsibilities: { $regex: searchRegex } },
        { requirements: { $regex: searchRegex } },
        { upper_jd: { $regex: searchRegex } },
      ];
    }

    // If category is provided, add it to the query
    if (category) {
      query.category = category;
    }

    // Query the database with the built query object
    const jobs = await Job.find(query);

    // Return filtered job postings
    res.status(201).json({
      success: true,
      message: 'job Search successfully',
      job:jobs
  });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a job
export const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const toggeled = async(req,res)=>{
  try {
   const { id } = req.params;
  

   // Find the admin by ID
   let job = await Job.findById(id);
   if(job.status ==='Active'){
    job.status = "Inactive";
   }
   else{
    job.status = "Active"
   }



 const updatedjob =  await job.save();


   if(updatedjob){
       res.status(201).send({
           success: true,
           message: "Job Status updated",
           updatedjob
         });
   }
   
  } catch (error) {
   res.status(500).send({
       success: false,
       message: "Errro in updating Job status",
       error,
     });
  }
}



export const getJobNames = async (req, res) => {
  try {
    // Fetch only jobName from all job documents
    const jobs = await Job.find({}, 'jobName');
    
    // Send the response with the job names
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching job names:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



export const getJobsByCategory = async (req, res) => {
  const { category } = req.body; // You can pass the category as a query parameter
 console.log(category)
  try {
    // Find jobs based on the category
    const jobs = await Job.find({
      category: { $regex: new RegExp(category, "i") }, // "i" for case-insensitive
      status: "Active"
    });
     console.log(jobs);
    if (jobs.length > 0) {
      res.status(200).json({
        success: true,
        jobs,
        message: `${jobs.length} job(s) found in ${category} category`
      });
    } else {
      res.status(404).json({
        success: false,
        message: `No jobs found in the ${category} category`
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching jobs',
      error: error.message
    });
  }
};

