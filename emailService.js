const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

// Function to send an email to a single recipient
const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Email loaded from .env
            pass: process.env.EMAIL_PASS  // Password loaded from .env
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: to, // Send to only one recipient at a time
        subject: subject,
        text: text
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent successfully to ${to}`);
    } catch (error) {
        console.error(`❌ Failed to send email to ${to}:`, error);
    }
};

module.exports = { sendEmail };
