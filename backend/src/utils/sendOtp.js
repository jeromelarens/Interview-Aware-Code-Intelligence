import nodemailer from "nodemailer";

export async function sendOtp(email, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"Interview App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your Login OTP",
    html: `<h2>Your OTP: ${otp}</h2><p>Valid for 5 minutes</p>`
  });
}
