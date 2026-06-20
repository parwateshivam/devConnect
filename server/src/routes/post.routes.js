import express from 'express';
import { handleCreatePost, handleGetAllPosts, handleGetUsersPosts } from '../controllers/post.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multer.middleware.js';

const postRouter = express.Router();

postRouter.post('/create-post', authMiddleware, upload.single('postImg'), handleCreatePost);

postRouter.get('/get-all-posts', authMiddleware, handleGetAllPosts);

postRouter.get("/get-users-posts", authMiddleware, handleGetUsersPosts);

export default postRouter;