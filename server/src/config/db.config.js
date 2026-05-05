import mongoose from "mongoose";
import { envConfig } from "./env.config.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(envConfig.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};