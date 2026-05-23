import USER from "../models/user.model.js";
import cloudinary from "../services/cloudinary.service.js";
import streamifier from "streamifier";
import POST from "../models/post.modal.js";

export const handleCreatePost = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const streamUpload = () => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "posts",
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };

        const result = await streamUpload();

        const user = req.user;

        const post = new POST({
            title,
            description,
            postImg: result.secure_url,
            createdBy: user._id,
        });

        await post.save();

        if (!post) {
            return res.status(400).json({ message: "Post not created" });
        }

        await USER.findByIdAndUpdate(user._id, {
            $push: { posts: post._id },
        });

        return res.status(200).json({ message: "Post created successfully" });
    } catch (error) {
        console.log(error);
    }
}

export const handleGetAllPosts = async (req, res) => {
    try {
        const posts = await POST.find(
            { createdBy: { $ne: req.user.id } }
        )
            .select("title description postImg createdAt createdBy")
            .populate({
                path: "createdBy",
                select: "name profileImg"
            })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            posts,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};