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

export const envConfig = {
    PORT,
    MONGO_URI,
    JWT_SECRET,
};