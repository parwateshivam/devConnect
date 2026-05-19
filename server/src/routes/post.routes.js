import express from 'express';
import { handleCreatePost } from '../controllers/post.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const postRouter = express.Router();

postRouter.post('/create-post', authMiddleware, upload.single('postImg'), handleCreatePost);

export default postRouter;