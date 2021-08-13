import * as nodemailer from "nodemailer";

export const sendEmail = () => {
  const mailTrasporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "***",
      pass: "***",
    },
  });
  const details = {
    from: "***",
    to: "***",
    subject: "Test Email",
    html: "<h1>Hello!</h1>",
  };
  mailTrasporter.sendMail(details, (err, data) => {
    if (err) {
      console.log("Error: ", err);
    }
    console.log("Success: ", data);
  });
};
