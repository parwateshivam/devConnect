import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.config.js";
import userRouter from "./routes/user.routes.js";

const app = express();

// ✅ Connect Database
connectDB();

// ✅ Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ✅ CORS Configuration
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://dev-connect-alpha-six.vercel.app"
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    })
);

// ✅ Health Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "DevConnect Backend Running 🚀"
    });
});

// ✅ API Routes
app.use("/api/user", userRouter);

// ✅ 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
    console.error("Server Error:", err);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

export default app;