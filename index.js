const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const port = 8080 || process.env.PORT;

const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

app.post("/sendemail", (req, res) => {
  const { firstName, lastName, email, phone, category, message } = req.body;

  if (!firstName || !lastName || !email || !phone || !message || !category) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const html2 = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h3 {
          color: #333333;
        }
        p {
          color: #555555;
          line-height: 1.6;
        }
        .email-header {
          background-color: #007BFF;
          color: white;
          padding: 10px;
          text-align: center;
          border-radius: 8px;
        }

        .email-header h3 {
        color: white;
        }
        .email-footer {
          text-align: center;
          margin-top: 20px;
          font-size: 12px;
          color: #777777;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h3>Contact Form Submission</h3>
        </div>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Last Name:</strong> ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <p><strong>category:</strong> ${category}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <div class="email-footer">
          <p>Thank you for your submission!</p>
        </div>
      </div>
    </body>
  </html>
`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "a7medelshhat@gmail.com",
      pass: "gychhsbtvygbmdfs",
    },
  });

  const transporter2 = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ahmedalbably777@gmail.com",
      pass: "xlguwoxddqxxaaey",
    },
  });

  const mailOptions = {
    form: email,
    to: "a7medelshhat@gmail.com",
    subject: "الفلوس",
    html: html2,
  };

  const mailOptions2 = {
    form: email,
    to: "ahmedalbably777@gmail.com",
    subject: "الفلوس",
    html: html2,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.status(400).send("message not sended!\n", error);
    } else {
      res.status(200).send("message sended!(form elshhat)");
    }
  });

  transporter2.sendMail(mailOptions2, function (error, info) {
    if (error) {
      res.status(400).send("message not sended!\n", error);
    } else {
      res.status(200).send("message sended!(from albably)");
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
