import mongoose from 'mongoose';

export default new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'member'
    },
    likedPosts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
}, {versionKey: false})
