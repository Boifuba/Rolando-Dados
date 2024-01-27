import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "Nova Mensagem de Rolando Dados.",
      text: message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.status(500).send("Error while sending email");
      } else {
        res.status(200).send("Email sent successfully");
      }
    });
  } else {
    res.status(405).json({ message: "We only accept POST" });
  }
}
