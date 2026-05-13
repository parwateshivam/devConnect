import jwt from "jsonwebtoken";
import { envConfig } from "../config/env.config.js";
import USER from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
    console.log(req.headers);
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "No token" });
        }
        const decoded = jwt.verify(token, envConfig.JWT_SECRET);
        const user = await USER.findById(decoded.userId);
        console.log(user);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};