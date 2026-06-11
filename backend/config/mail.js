import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rohithkumar2196@gmail.com",
    pass: "cwlg zsio puzz tlmu",
  },
});

export default transporter;