import { Resend } from "resend";
import { envConfig } from "../config/env.config.js";

const resend = new Resend(envConfig.RESEND_API_KEY);

export const sendEmail = async (email, name) => {
    try {
        const response = await resend.emails.send({
            from: "DevConnect <onboarding@resend.dev>",
            to: email,
            subject: "Welcome to DevConnect",
            html: `
                <h1>Hello ${name}</h1>
                <p>Welcome to DevConnect 🚀</p>
            `,
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
}