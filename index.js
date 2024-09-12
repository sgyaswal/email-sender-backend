// index.js
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Email sending route
app.post('/send-email', async (req, res) => {
  const { email, subject, message } = req.body;

  // Nodemailer transport configuration
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user:"",
      pass: "",
    },
  });

  // Email options
  const mailOptions = {
    from: "sgyaswal@gmail.com",
    to: email,
    subject: subject,
    text: message,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send({ error: 'Failed to send email' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
