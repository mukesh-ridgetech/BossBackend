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
      to: process.env.RECIPIENT_EMAIL_1 ,
      subject: `New message from ${user.firstName}`,
      text: `Hello ${user.firstName},

You have a query from our website contact form.
Here are the details below:

1. Name: ${user.firstName}
2. Organization: ${user.organization}
3. Designation: ${user.designation}
4. Country: ${user.country}
5. Email: ${user.email}
6. Phone: ${user.phoneNumber}
7. Description: ${user.description}

Best wishes`,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent');
  } catch (error) {
    console.error('Error sending email', error);
    throw error; // Throw error to handle it in the route
  }
};
