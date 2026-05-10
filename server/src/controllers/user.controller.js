import USER from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/env.config.js";

export const handleRegister = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingUser = await USER.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new USER({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
        });

    } catch (error) {
        console.error("Register Error:", error.message);

        if (error.message === "User already exists") {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

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
                skills: user.skills,
                bio: user.bio
            },
            token
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

