const cron = require('node-cron');
const express = require('express');
const http = require('http');
const { sendEmail } = require('./utils/emailService'); // Updated utils to handle single emails
const app = express();

// List of email recipients
const emailRecipients = [
    'jeevikajeevika733@gmail.com',
    'mvikash7575@gmail.com',
    'ssubalakshmi2004@gmail.com',
    'sakthivel21a34@gmail.com',
    'theivanai3004@gmail.com'
];

// Route for testing server status
app.get('/', (req, res) => {
    res.send('📬 Bulk Email Scheduler is running...');
});

// Schedule cron job to send emails every day at 3 PM IST (Indian Standard Time)
cron.schedule('0 18 * * *', () => {
    console.log('⏰ Running Cron Job for bulk emails at 6 PM...');
    
    const subject = 'Your Daily Scheduled Email';
    const text = 'This is your daily reminder sent automatically at 6 PM...';
    
    // Send individual emails to each recipient
    Promise.all(emailRecipients.map((recipient) => {
        return sendEmail(recipient, subject, text);
    }))
        .then(() => {
            console.log('✅ All emails sent successfully!');
        })
        .catch((error) => {
            console.error('❌ Failed to send some emails:', error);
        });
}, {
    scheduled: true,
    timezone: "Asia/Kolkata" // Set the timezone to Indian Standard Time (IST)
});

// Function to check if a port is in use and try the next available one
const getAvailablePort = (startPort) => {
    return new Promise((resolve, reject) => {
        const server = http.createServer();
        let port = startPort;

        server.listen(port, () => {
            server.close(() => {
                resolve(port); // Return the available port
            });
        });

        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.log(`Port ${port} is in use, trying next port...`);
                resolve(getAvailablePort(port + 1)); // Try next port
            } else {
                reject(err); // Reject if another error occurs
            }
        });
    });
};

// Start the Express server
(async () => {
    const port = process.env.PORT || 9000; // Starting port to check
    try {
        const availablePort = await getAvailablePort(port);
        app.listen(availablePort, () => {
            console.log(`Server running on http://localhost:${availablePort}`);
        });
    } catch (error) {
        console.error('Error finding available port:', error);
    }
});
