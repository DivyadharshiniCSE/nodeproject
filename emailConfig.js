
const nodemailer = require('nodemailer');
require('dotenv').config();  // Load environment variables from .env file

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,    // Use environment variables for host
    port: process.env.EMAIL_PORT,    // Use environment variables for port
    secure: false,                   // Use false for non-SSL/TLS connections
    auth: {
        user: process.env.EMAIL_USER,  // Use environment variable for email address
        pass: process.env.EMAIL_PASS,  // Use environment variable for app password
    },
});

module.exports = transporter;  // Export transporter

