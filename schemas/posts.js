const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: Number,
        required: true,
    },

    content: {
        type: String,
        required: true,
    },
    
    createdAt: {
        type: Date,
        default: Date.now, // 현재시간을 기본값으로
    },
});

module.exports = mongoose.model("Post", postsSchema);