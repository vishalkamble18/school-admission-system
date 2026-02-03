
import nodemailer from "nodemailer";

export const sendMail = async (to, subject, text) => {
  try {
    

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify SMTP connection
    await transporter.verify();

    const info = await transporter.sendMail({
      from: `"School Admission" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

  } catch (error) {
    console.error("❌ MAIL ERROR FULL:", error);
  }
};
