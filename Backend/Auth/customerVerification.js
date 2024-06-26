import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export async function sendVerificationEmail(email, token){
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',// or any email service you use
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USERNAME,
            pass: process.env.SMTP_PASSWORD
        }
    });
    const verificationLink = `http://localhost:4000/api/customer/verify-email/${token}`;

    const mailContent = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Email Verification",
        text: `Please verify your email by clicking the following link: <a href="${verificationLink}">Verify</a>`,
    };

    await transporter.sendMail(mailContent);
}