import express from 'express';
import {
    handleRegister,
    handleVerifyEmail,
    handleEmailOtpRequest,
    handleLogin,
    handleProfile
} from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/register', handleRegister);

userRouter.post('/verify-email', handleVerifyEmail);

userRouter.post('/request-email-otp', handleEmailOtpRequest);

userRouter.post('/login', handleLogin);

userRouter.get('/profile', handleProfile);

export default userRouter;