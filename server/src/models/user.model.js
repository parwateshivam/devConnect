import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        default: []
    },
    bio: {
        type: String,
        default: ""
    }
}, { timestamps: true });

const USER = mongoose.model("user", userSchema);

export default USER;