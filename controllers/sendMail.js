import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
    
  },
});


// "firstName": "mukesh",
// "lastName":"kushwaha",
// "phoneNumber":"9889987876",
// "email":"mukesh290@gmail.com",
// "question":"I want to applied job"

export const sendEmail = async (user) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email ,
      subject: `We have recieved your query`,
      text: `Hello ${user.firstName},

You have a query from our website contact form.
Here are the details below:

1. Name: ${user.firstName}
2. Email: ${user.email}
3. Phone: ${user.phoneNumber}
4. Description: ${user.description}

Best wishes,
Boss
`
,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent');
  } catch (error) {
    console.error('Error sending email', error);
    throw error; // Throw error to handle it in the route
  }
};




export const sendEmailJobApplicants = async (user, job) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `Job Application Successful for Position of ${job.jobName}`,
      text: `Hello ${user.firstName},

You have successfully applied for a job from our website.
Here are the details below:

1. Name: ${user.firstName}
2. Email: ${user.email}
3. Phone: ${user.phoneNumber}
4. Job Description: ${job.jobDescription}

Best wishes,
Boss`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent');
  } catch (error) {
    console.error('Error sending email', error);
    throw error; // Throw error to handle it in the route
  }
};


export const sendEmailEmployers = async (user, job) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: job.email,
      subject: `New Application for Position: ${job.jobName}`,
      text: `Hello,

You have received a new job application for the position of ${job.jobName}.
Here are the applicant's details:

1. Name: ${user.firstName} ${user.lastName}
2. Email: ${user.email}
3. Phone: ${user.phoneNumber}
4. Job Description: ${job.jobDescription}

Best regards,
Boss`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent to the employer');
  } catch (error) {
    console.error('Error sending email', error);
    throw error; // Throw error to handle it in the route
  }
};


export const sendEmailClient = async (user) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `We have received your job posting request`,
      text: `Hello ${user.firstName},

We have received your request to post a job on our website.
Here are the details we collected from the contact form:

1. Name: ${user.firstName} ${user.lastName}
2. Email: ${user.email}
3. Phone: ${user.phoneNumber}

Thank you for reaching out! We will get back to you shortly with more information.

Best wishes,
Boss`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent to the client');
  } catch (error) {
    console.error('Error sending email', error);
    throw error; // Throw error to handle it in the route
  }
};



