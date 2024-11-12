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
      subject: `Thank You for Reaching Out to Us!`,
      text: `Dear ${user.firstName},

Thank you for contacting us through our website. We’ve received your query and want to let you know we’re here to help. Our team is reviewing your message, you can expect a response from us within the next 24 hours.

If you have additional details to share in the meantime, please feel free to reply to this email. We look forward to helping you with your request.

Warm regards,
BOSS Recruitment Team

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
      subject: `Thank You for Your Job Application `,
      text: `Dear  ${user.firstName},

Thank you for applying for the ${job.jobName} position. We appreciate your interest in the role.

Our recruitment team is currently reviewing your application along with others. If your profile aligns with the client's requirements, we will contact you within the next 1-2 weeks regarding the next steps.

In the meantime, if you have any questions, feel free to reach out to us.

Thank you for your time and interest in the opportunity.


Best regards,,
BOSS Recruitment Team

`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent');
  } catch (error) {
    console.error('Error sending email', error);
    throw error; // Throw error to handle it in the route
  }
};


export const sendEmailJobToAdmin = async (user, job) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'applications@bossservices.biz',
      subject: `Thank You for Your Job Application `,
      text: `Dear  ${user.firstName},

Thank you for applying for the ${job.jobName} position. We appreciate your interest in the role.

Our recruitment team is currently reviewing your application along with others. If your profile aligns with the client's requirements, we will contact you within the next 1-2 weeks regarding the next steps.

In the meantime, if you have any questions, feel free to reach out to us.

Thank you for your time and interest in the opportunity.


Best regards,,
BOSS Recruitment Team

`,
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
      subject: `Thank You for Your Job Application `,
      text: `Dear ${user.firstName},

    Thank you for applying for the ${job.jobName} position. We appreciate your interest in the role.

Our recruitment team is currently reviewing your application along with others. If your profile aligns with the client's requirements, we will contact you within the next 1-2 weeks regarding the next steps.

In the meantime, if you have any questions, feel free to reach out to us.

Thank you for your time and interest in the opportunity.


    Best regards,
   BOSS Recruitment Team,
   `


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
      to: 'applications@bossservices.biz',
      subject: `New Vacancy Submission Received for "We Find Professionals for You!`,
      text: `Dear Ginger,

A new vacancy request has been submitted through our "We Find Professionals for You!" service. Please follow up with the client to gather additional details and begin the recruitment process.

Here are the initial details of the client submission:

1.Client Name: ${user.firstName}
2.Email:  ${user.email}
3.Phone: ${user.phoneNumber}


Please reach out to the client within 1-2 business days to discuss the position specifics and confirm their requirements.

Best regards,
BOSS Recruitment Team`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent to the client');
  } catch (error) {
    console.error('Error sending email', error);
    throw error; // Throw error to handle it in the route
  }
};



export const sendEmailToAdmin = async (user) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'applications@bossservices.biz',
      subject: `Thank You for Reaching Out to Us!`,
      text: `Dear Ginger,

You have received a new query through the website contact form. Please find the details below:
Name: ${user.firstName}
Email:${user.email}
Phone: ${user. phoneNumber}
Description:${user.question}

Warm regards,
BOSS Recruitment Team

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



