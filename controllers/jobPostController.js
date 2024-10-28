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

    const { location, category, jobType, upper_jd, jobName,jobDescription,image,responsibilities ,phone,requirements,logo,email} = req.body;
    const newJob = new Job({ location, category, jobType, upper_jd, jobName,jobDescription,image,responsibilities ,phone,requirements,logo,email});
    const savedJob = await newJob.save();

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
