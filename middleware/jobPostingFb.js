import  axios from 'axios'

export const postToFacebookFeed = async (job) => {
  const userAccessToken = 'EAAXOfpJjjUMBO3mKDV2ZAUoP4ZAvTIamJjwl7iwiagcGqfBPqVBDCcZC7EqJa839rZBQln95bsZAXK2CCAiZArbkwvtHuPK9Bvd4IS8tnPaZBSMCvdmNo5t8CeS9mTPdMY3G5nAWYExRZAtV9k9FeMXXKYZAVjcAHv8pcMsmyHRsossmvbDGQFj61HAZDZD'; // Your extended user token
  const message = `
  New Job Posted!
  - Job Name: ${job.jobName}
  - Location: ${job.location}
  - Category: ${job.category}
  - Job Type: ${job.jobType}
  - Description: ${job.jobDescription}
  - Responsibilities: ${job.responsibilities}
  - Requirements: ${job.requirements}
  - Contact: ${job.email} / ${job.phone}
`;

  try {
    const url = `https://graph.facebook.com/v19.0/me/feed`;
    const payload = {
      message: message,
      access_token: userAccessToken,
    };

    const response = await axios.post(url, payload);
    console.log('Post created successfully:', response.data);
  } catch (error) {
    console.error('Error posting to Facebook feed:', error.response ? error.response.data : error.message);
  }
};


