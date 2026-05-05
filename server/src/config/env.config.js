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

export const envConfig = {
    PORT,
    MONGO_URI,
    JWT_SECRET,
    EMAIL,
    EMAIL_PASSWORD
};