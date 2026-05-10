import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
if (!PORT) {
    console.error('Error: PORT environment variable is not set.');
    process.exit(1);
}

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error('Error: MONGO_URI environment variable is not set.');
    process.exit(1);
}

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.error('Error: JWT_SECRET environment variable is not set.');
    process.exit(1);
}

const EMAIL = process.env.EMAIL;
if (!EMAIL) {
    console.error('Error: EMAIL environment variable is not set.');
    process.exit(1);
}

const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
if (!EMAIL_PASSWORD) {
    console.error('Error: EMAIL_PASSWORD environment variable is not set.');
    process.exit(1);
}

const REDIS_USERNAME = process.env.REDIS_USERNAME;
if (!REDIS_USERNAME) {
    console.error('Error: REDIS_USERNAME environment variable is not set.');
    process.exit(1);
}

const REDIS_PASSWORD = process.env.REDIS_PASSWORD;
if (!REDIS_PASSWORD) {
    console.error('Error: REDIS_PASSWORD environment variable is not set.');
    process.exit(1);
}

const REDIS_HOST = process.env.REDIS_HOST;
if (!REDIS_HOST) {
    console.error('Error: REDIS_HOST environment variable is not set.');
    process.exit(1);
}

const REDIS_PORT = process.env.REDIS_PORT;
if (!REDIS_PORT) {
    console.error('Error: REDIS_PORT environment variable is not set.');
    process.exit(1);
}

const RESEND_API_KEY = process.env.RESEND_API_KEY;
if (!RESEND_API_KEY) {
    console.error('Error: RESEND_API_KEY environment variable is not set.');
    process.exit(1);
}

export const envConfig = {
    PORT,
    MONGO_URI,
    JWT_SECRET,
    EMAIL,
    EMAIL_PASSWORD,
    REDIS_USERNAME,
    REDIS_PASSWORD,
    REDIS_HOST,
    REDIS_PORT,
    RESEND_API_KEY
};