const nodemailer = require("nodemailer");
require("dotenv").config();

exports.handleConsultationForm = async (req, res) => {
  const { studentName, phoneNumber, classGrade, location } = req.body;

  if (!studentName || !phoneNumber || !classGrade || !location) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.TO_EMAIL,
      subject: "New Free Consultation Request",
      html: `
        <h3>New Tutor Consultation Request</h3>
        <p><strong>Student Name:</strong> ${studentName}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Class/Grade:</strong> ${classGrade}</p>
        <p><strong>Location:</strong> ${location}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({
        success: true,
        message: "Consultation request sent successfully!",
      });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ success: false, message: "Error sending email." });
  }
};
