import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    blogTitle: {
        type: String,
        required: [true, "Please enter your blog title"],
    },
    blogContent: {
        type: String,
        required: [true, "Please enter your blog content"],
    },
    blogImage: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Blog = mongoose.model('Blog', schema);