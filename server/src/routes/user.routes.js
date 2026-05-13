import express from 'express';
import {
    handleRegister,
    handleLogin,
    handleUploadProfileImg
} from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const userRouter = express.Router();

userRouter.post('/register', handleRegister);

userRouter.post('/login', handleLogin);

userRouter.post(
    '/upload-profile-img',
    authMiddleware,
    upload.single('profileImg'),
    handleUploadProfileImg
);

export default userRouter;