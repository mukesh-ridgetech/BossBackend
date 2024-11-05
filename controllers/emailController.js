import nodemailer from 'nodemailer';

// Function to send an email
export const sendEmail = async (req, res) => {
 

  try {
    // Create transporter object using Gmail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
      auth: {
        user: 'mohitkushwaha4508@gmail.com',  // Your email address
        pass: '123@Rohit'  // Your email password or app-specific password
      }
    });

    // Mail options
    const mailOptions = {
      from: 'mohitkushwaha4508@gmail.com',  // Sender address
      to: 'mukeshkushwaha9000@gmail.com',                                  // Receiver email
      subject: 'Nodemailer is unicode friendly ✔',                     // Subject line
      text: 'Hello to myself!',
      html: '<p><b>Hello</b> to myself!</p>'                         // Plain text body
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully', info });

    transporter.sendMail(mailOptions, (err, infor) => {
        if(err) return err;
        return infor
    })

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email', error });
  }
};
