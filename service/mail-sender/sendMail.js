const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (userMail, data) => {
  const transporter = nodemailer.createTransport({
    // host: "sandbox.smtp.mailtrap.io",
    // port: 2525,
    service:'Gmail',
    auth: {
      user: "aliraza126005@gmail.com",
      pass: 'ovkr eoxv zevb tjkf',
    },
  });

  const verificationLink = `http://localhost:5173/user-verification?link=${data.value}`; 

  const emailTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Template</title>
  </head>
  <body>
    <div style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #ffffff; display: flex; justify-content: center; align-items: center; height: 100vh;">
      <div style="background-color: black; padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); text-align: center; color:white;">
        <h1 style="color: #ffffff;">Verification Link</h1>
        <p style="color: #ffffff; font-size: 16px; line-height: 1.6;">Please click the verify button to verify your account</p>
        <a href="${verificationLink}" style="background-color: blue; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify</a>
      </div>
    </div>
  </body>
  </html>
  `;

  const mailOptions = {
    from: "aliraza126005@gmail.com",
    to: userMail,
    subject: data.subject,
    html: emailTemplate,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};

module.exports = sendMail;
