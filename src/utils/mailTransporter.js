import nodemailer from "nodemailer";

export const mailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mavadiyadivyesh56@gmail.com",
    pass: "xlsz gkwd rrtg qhip",
  },
});


// const mailOptions = {
//   from: "mavadiyadivyesh56@gmail.com",
//   to: "divu0017@gmail.com",
//   subject: "Checking nodemailer",
//   text: "if this mail reached you then i work perfectly",
// };

// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.error("error occured", error.message);
//   } else {
//     console.log(`Email sent: ${info.response}`);
//   }
// });