const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const mail = { ...data, from: "dmitriy.davidyuk.95@gmail.com" };
  await sgMail.send(mail);
  return true;
};

module.exports = sendEmail;
