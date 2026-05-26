import nodemailer from "nodemailer";
import { envConfig } from "../config/env.config.js";

export const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
        user: envConfig.SMTP_USER,
        pass: envConfig.SMTP_PASS,
    },
});