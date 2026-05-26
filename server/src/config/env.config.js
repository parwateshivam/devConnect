import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const CLOUDINARY_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_USER = process.env.SMTP_USER;

export const envConfig = {
    PORT,
    MONGO_URI,
    JWT_SECRET,
    CLOUDINARY_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    SENDER_EMAIL,
    SMTP_PASS,
    SMTP_USER
};