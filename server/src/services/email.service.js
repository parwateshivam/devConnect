import { Resend } from 'resend';
import { envConfig } from '../config/env.config.js';

const resend = new Resend(envConfig.RESEND_API_KEY);

export const sendEmail = async (email, otp) => {

    try {

        const response = await resend.emails.send({
            from: 'DevConnect <onboarding@resend.dev>',
            to: email,
            subject: 'Verify Your Email - DevConnect',

            html: `
            <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                
                <div style="max-width: 500px; margin: auto; background: #ffffff; border-radius: 10px; padding: 20px; text-align: center;">
                    
                    <h2 style="color: #333;">DevConnect</h2>
                    
                    <p style="font-size: 16px; color: #555;">
                        Thank you for registering!
                    </p>

                    <p style="font-size: 16px; color: #555;">
                        Use the OTP below to verify your email address:
                    </p>

                    <div style="font-size: 28px; font-weight: bold; letter-spacing: 5px; color: #4CAF50; margin: 20px 0;">
                        ${otp}
                    </div>

                    <p style="color: #999; font-size: 14px;">
                        This OTP is valid for <b>10 minutes</b>.
                    </p>

                    <p style="color: #999; font-size: 12px;">
                        If you did not request this, please ignore this email.
                    </p>

                </div>

            </div>
            `
        });

        console.log('Email sent successfully.');
        console.log(response);

        return otp;

    } catch (error) {

        console.error('Error sending email:', error);
        throw error;

    }
};