const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
require('dotenv').config();



app.use(express.json());

app.post("/send-email", async (req, res) => {
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
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
