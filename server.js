const express = require("express");
const nodemailer = require("nodemailer");
require('dotenv').config();
const cors = require("cors");
const app = express();

app.use(cors({
  origin: process.env.ORIGIN,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
}));


app.use(express.json());

app.post("/send-email", async (req, res) => {
  try {
    const { email, subject, content } = req.body;

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.ACC_EMAIL,
        pass: process.env.ACC_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: email,
      to: process.env.SENT_TO,
      subject: subject,
      html: `
      <html>
        <head>
          <style>
            a {
              color: blue;
            }
            p {
              font-size: 16px;
            }
            .subject {
              font-size: 20px;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <a>Email from ${email}</a>
          <p class="subject">العنوان: ${subject}</p>
          <p>الرسالة: ${content}</p>
        </body>
      </html>
    `,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email" });
  }
});


app.post("/send-ratings", async (req, res) => {
  try {
    const { name, content } = req.body;
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.ACC_EMAIL,
        pass: process.env.ACC_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: name,
      to: process.env.SENT_TO,
      subject: name,
      html: `
      <html>
        <head>
          <style>
            a {
              color: blue;
            }
            p {
              font-size: 16px;
            }
            .subject {
              font-size: 20px;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <a class="subject">رسالة من قبل: ${name}</a>
          <p>الرسالة: ${content}</p>
        </body>
      </html>
    `,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
