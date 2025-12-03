const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const mailKey = process.env.MAIL_SECRET;
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "gmail",
  //   port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "podiousplus@gmail.com",
    pass: mailKey,
  },
});

// Wrap in an async IIFE so we can use await.
const sendMail = async (email) => {
  try {
    const info = await transporter.sendMail({
      from: '"Admin: John OKeke" <podiousplus@gmail.com>',
      to: email,
      subject: "Account Confirmation",
      // text: "?", // plain‑text body
      html: "<h1>Congratulations account created</h1>", // HTML body
    });
    console.log("Message sent:", info.messageId);
  } catch (err) {
    console.log(err);
  }
};

module.exports = sendMail;
