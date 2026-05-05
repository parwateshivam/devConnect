import USER from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../services/nodemailer.service.js";
import redisClient from "../config/redisClient.config.js";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/env.config.js";
import { generateOTP } from "../utils/generateOTP.js";

export const handleRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const isUserExist = await USER.findOne({ email });

        if (isUserExist) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new USER({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        const otp = generateOTP();

        await redisClient.set(`${email}`, otp, {
            EX: 300
        });

        await sendEmail(email, otp);

        res.status(201).json({
            message: "User registered successfully",
            user: {
                name: user.name,
                email: user.email,
                isEmailVerified: user.isEmailVerified,
                skills: user.skills,
                bio: user.bio
            }
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const handleVerifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await USER.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isEmailVerified = user.isEmailVerified;

        if (isEmailVerified) {
            return res.status(400).json({ message: "Email already verified" });
        }

        const key = `${email}`;
        const storedOTP = await redisClient.get(key);

        if (!storedOTP) {
            return res.status(400).json({ message: 'OTP expired or not found' });
        }

        if (storedOTP === otp) {
            await USER.updateOne(
                { email },
                { $set: { isEmailVerified: true } }
            );

            await redisClient.del(key);

            return res.status(200).json({
                success: true,
                message: 'OTP verified successfully'
            });
        }

        return res.status(400).json({
            success: false,
            message: 'Invalid OTP'
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const handleEmailOtpRequest = async (req, res) => {
    const { email } = req.body

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const user = await USER.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const otp = generateOTP();

    await redisClient.set(`${email}`, otp, {
        EX: 300 // OTP expires in 5 minutes)
    });

    await sendEmail(email, otp);

    return res.status(200).json({
        success: true,
        message: 'OTP sent successfully'
    });
}

export const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const user = await USER.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        if (!user.isEmailVerified) {
            return res.status(400).json({ error: "Please verify your email before logging in" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            envConfig.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                isEmailVerified: user.isEmailVerified,
                skills: user.skills,
                bio: user.bio
            },
            token
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const handleProfile = async (req, res) => { };