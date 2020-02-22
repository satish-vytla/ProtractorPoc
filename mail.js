/*
    Video: https://www.youtube.com/watch?v=Va9UKGs1bwI
    Don't forget to disable less secure app from Gmail: https://myaccount.google.com/lesssecureapps TODO:
*/

require('dotenv').config();

const nodemailer = require('nodemailer');
const log = console.log;

// Step 1
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL || 'satishshoponline@gmail.com', // TODO: your gmail account
        pass: process.env.PASSWORD || '' // TODO: your gmail password
    }
});

// Step 2
let mailOptions = {
    from: 'satishshoponline@gmail.com', // TODO: email sender
    to: 'satishshoponline@gmail.com', // TODO: email receiver
    subject: 'Nodemailer - Test',
    text: 'Wooohooo it works!!',
    attachments: [
        { filename: 'reports/chrome-test-report.HTML', path: './reports/chrome-test-report.HTML' } // TODO: replace it with your own image
    ]
};

// Step 3
transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return log('Error occurs');
    }
    return log('Email sent!!!');
});