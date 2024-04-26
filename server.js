const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pardhuk45@gmail.com',
    pass: '9985041136'
  }
});

const users = {};

app.use(express.static('public'));

app.post('/signup', (req, res) => {
    console.log(req.body);
    const email  = 'narsi0804@gmail.com';
  
  const verificationToken = crypto.randomBytes(20).toString('hex');

  users[verificationToken] = email;

  const mailOptions = {
    from: 'pardhuk45@gmail.com',
    to: email,
    subject: 'Email Verification',
    html: `<p>Please click the following link to verify your email address:</p>
           <a href="http://localhost:3000/verify?token=${verificationToken}">Verify Email</a>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Verification email sent');
    }
  });
});

  app.get('/verify', (req, res) => {
    const { token } = req.query;
    const email = users[token];

    if (email) {
        console.log(`User with email ${email} has been verified.`);
        res.send('Email verification successful!');
      } else {
        res.status(400).send('Invalid verification token');
      }
  });

  
  app.listen(3001, () => {
    console.log('Server is running on port 3000');
  });