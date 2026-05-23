import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    profileImg: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        default: [],
    },
    bio: {
        type: String,
        default: "",
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post",
        },
    ],
}, { timestamps: true, });

const USER = mongoose.model("user", userSchema);

export default USER;