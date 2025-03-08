const nodemailer = require('nodemailer');

async function sendAlert(email, fileDetails) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.ALERT_EMAIL,
            pass: process.env.ALERT_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.ALERT_EMAIL,
        to: email,
        subject: 'Obscene Content Alert',
        text: `Obscene content detected:\n\nFile Details: ${JSON.stringify(fileDetails, null, 2)}`
    };

    await transporter.sendMail(mailOptions);
}

module.exports = { sendAlert };
