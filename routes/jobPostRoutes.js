import express from 'express';
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  filterJobs,
  getFilteredJobs,
  toggeled,
  getJobNames,
  getJobsByCategory,
} from '../controllers/jobPostController.js';

const router = express.Router();

// Create job
router.post('/createJob', createJob);

// Get all jobs
router.get('/getAllJobs', getAllJobs);
router.get('/jobNames', getJobNames);

// Get job by ID
router.get('/getJobById/:id', getJobById);
router.get('/jobfilter', filterJobs);
router.get('/jobfilterHome', getFilteredJobs);
router.post('/filterByCatagory', getJobsByCategory);

// Update job
router.put('/updateJob/:id', updateJob);
router.patch('/toggled/:id',  toggeled);


// Delete job
router.delete('/deleteJob/:id', deleteJob);

export default router;
