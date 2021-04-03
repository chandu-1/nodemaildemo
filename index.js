const nodemailer = require('nodemailer');
const express = require('express');
const fs = require('fs');
const app = express()
var multer = require('multer');

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.get('/hello', (req, res) => {
  res.send("Hello World");
});
var to;
var subject;
var body;
var myFile;


app.post('/sendEmail', function (req, res) {
  to = req.body.to;
  subject =  req.body.subject;
  body = req.body.body;
  myFile = req.body.file;

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ssk000011110000@gmail.com',
      pass: 'hellor2223b'
    }
  });

  var mailOptions = {
    from: 'cth001100@gmail.com',
    to: to,
    subject: subject,
    text: body,
    attachments: [{
      content: Uint8Array.from(myFile),
      fileName: "Something.pdf",
      contentType: 'application/pdf'
    }]
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send("Error" + error)
    } else {
    
      res.status(200).json({ message: "Success" })
      console.log('Email sent: ' + info.response);
    }
  });
})

/* app.listen(3000, () => {
  console.log("Sever is running at 3000 port");
}) */