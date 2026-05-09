import USER from "../models/user.model.js";
import bcrypt from "bcryptjs";
import redisClient from "../config/redisClient.config.js";
import { generateOTP } from "../utils/generateOTP.js";
import { sendEmail } from "../services/nodemailer.service.js";

export const registerUserService = async ({ name, email, password }) => {

    // check user
    const isUserExist = await USER.findOne({ email });
    if (isUserExist) {
        throw new Error("User already exists");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await USER.create({
        name,
        email,
        password: hashedPassword
    });

    // generate OTP
    const otp = generateOTP();

    // store OTP in Redis
    try {
        await redisClient.set(`otp:${email}`, otp, { EX: 300 });
    } catch (err) {
        console.error("Redis Error:", err);
        throw new Error("OTP service failed");
    }

    // 🔥 async email (NON-BLOCKING)
    sendEmail(email, otp).catch(err => {
        console.error("Email failed:", err);
    });

    return user;
};