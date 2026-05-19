import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.config.js";
import userRouter from "./routes/user.routes.js";
import postRouter from "./routes/post.routes.js";

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://dev-connect-alpha-six.vercel.app"
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

// API Routes
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);

export default app;