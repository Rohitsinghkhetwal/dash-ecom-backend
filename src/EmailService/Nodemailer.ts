//logic for nodemailer here .
import nodemailer from "nodemailer";


console.log("env file",process.env.MAILTRAP_SMTP_HOST )


export const sendMail = async (to: string, subject: string, text: string) => {
  try {
    console.log("INSIDE THE MAILTRAP HERE",process.env.MAILTRAP_SMTP_USER)
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    const info = await transport.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject,
      text
    })

    console.log("Message sent ", info);
    return info;
  } catch (err) {
    console.log("Nodemailer error ", err)
    throw err;
  }
};
