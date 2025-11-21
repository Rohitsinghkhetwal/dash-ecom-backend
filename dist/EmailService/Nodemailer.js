"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
//logic for nodemailer here .
const nodemailer_1 = __importDefault(require("nodemailer"));
console.log("env file", process.env.MAILTRAP_SMTP_HOST);
const sendMail = async (to, subject, text) => {
    try {
        console.log("INSIDE THE MAILTRAP HERE", process.env.MAILTRAP_SMTP_USER);
        const transport = nodemailer_1.default.createTransport({
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
        });
        console.log("Message sent ", info);
        return info;
    }
    catch (err) {
        console.log("Nodemailer error ", err);
        throw err;
    }
};
exports.sendMail = sendMail;
