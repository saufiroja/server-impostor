const nodemailer = require('nodemailer');

const kirimEmail = (dataEmail) => {
  console.log('dataEmail', dataEmail);
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // upgrade later with STARTTLS
    requireTLS: true,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  return transporter
    .sendMail(dataEmail)
    .then((info) => console.log('Email terkirim:', info.messageId))
    .catch((err) => console.log('Terjadi kesalahan:', err));
};

module.exports = { kirimEmail };
