import express from 'express';
import { connectDB } from './config/db.config.js';
import userRouter from './routes/user.routes.js';
import cors from 'cors';

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
}));

app.use('/api/user', userRouter);

export default app;