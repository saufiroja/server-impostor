const nodemailer = require('nodemailer');

const kirimEmail = (dataEmail) => {
  const transporter = nodemailer.createTransport({
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
    .then((info) => info.messageId)
    .catch((err) => err);
};

module.exports = { kirimEmail };
