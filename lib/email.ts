import nodemailer from "nodemailer";

export const mailer = nodemailer.createTramsport({
  host: "smtp.resend.com",
  port: 587,
  auth: {
    user: "resend",
    pass: process.env.RESEND_API_KEY,
  },
});
