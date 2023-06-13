import mongoose from 'mongoose';

export default new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    upvote: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        default: []
    }]
}, {timestamps: true, versionKey: false})
