import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 8000,
  secure: false,
  auth: {
    user: "scheduler2625@gmail.com",
    pass: "tzsmaxieiroasryp",
  },
});
