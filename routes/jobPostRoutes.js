import express from 'express';
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  filterJobs,
} from '../controllers/jobPostController.js';

const router = express.Router();

// Create job
router.post('/createJob', createJob);

// Get all jobs
router.get('/getAllJobs', getAllJobs);

// Get job by ID
router.get('/getJobById/:id', getJobById);
router.get('/jobfilter', filterJobs);
// Update job
router.put('/updateJob/:id', updateJob);



// Delete job
router.delete('/deleteJob/:id', deleteJob);

export default router;
