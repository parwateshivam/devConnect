import USER from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/env.config.js";
import cloudinary from "../services/cloudinary.service.js";
import streamifier from "streamifier";
import { transporter } from "../services/email.service.js";

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

        const emaiOptions = {
            from: envConfig.SENDER_EMAIL,
            to: email,
            subject: "Registration successful",
            text: `Hello ${name},\n\nYou have successfully registered.`
        };

        await transporter.sendMail(emaiOptions);
    } catch (error) {
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

        // await sendEmail(email, user.name);

        res.status(200).json({
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
                profileImg: user.profileImg,
                skills: user.skills,
                bio: user.bio
            },
            token
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const handleUploadProfileImg = async (req, res) => {
    try {
        // Check file
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        // Upload function
        const streamUpload = () => {
            return new Promise((resolve, reject) => {

                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "profile_images",
                    },
                    (error, result) => {

                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );

                streamifier
                    .createReadStream(req.file.buffer)
                    .pipe(stream);
            });
        };

        // Upload image to cloudinary
        const result = await streamUpload();

        // Update user in database
        const updatedUser = await USER.findByIdAndUpdate(
            req.user._id,
            {
                profileImg: result.secure_url,
            },
            {
                new: true,
            }
        );

        // Response
        res.status(200).json({
            success: true,
            message: "Profile image uploaded successfully",
            user: {
                name: updatedUser.name,
                email: updatedUser.email,
                profileImg: updatedUser.profileImg,
                skills: updatedUser.skills,
                bio: updatedUser.bio,
            },
        });

    } catch (error) {

        console.log("UPLOAD ERROR:", error);

        res.status(500).json({
            success: false,
            message: error.message || "Image upload failed",
        });
    }
};