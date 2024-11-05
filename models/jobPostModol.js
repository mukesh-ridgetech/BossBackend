import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    required: true
  },
  upper_jd: {
    type: [String],
    required: true
  },
  
  jobName:{
    type:String,
    required:true
  },
  jobDescription:{
    type:String,
    required:true,
  },

 
  responsibilities: {
    type: [String], 
    required: true
  },
 
  requirements: {
    type: [String], 
    required: true
  },

  image:{
    type:String,
    required:true,
  },
  email: {
    type: String, 
    required: true
  },
  phone:{
    type:String,
    required:true,
  },
  logo:{
    type:String,
    
  }
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);

export default Job;
