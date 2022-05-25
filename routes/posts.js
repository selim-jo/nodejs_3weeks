const express = require('express');
const res = require('express/lib/response');
const Post = require('../schemas/posts');
const router = express.Router();
//###########################################################################################################//
// home 및 전체 게시글 목록 조회 API
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({}, {title:1, name:1, createdAt:1, _id:0}).sort({ createdAt: -1});
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//###########################################################################################################//
// 게시글 작성 API
router.post('/', async (req, res) => {
    const { title, name, password, content } = req.body;
    try {
        const newPost = await Post.create({
            title,
            name,
            password,
            content,
        });
        res.json({ posts: newPost });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
//###########################################################################################################//
// 게시글 조회 API (작성자 이름 기준)
router.get('/:name', async (req, res) => {
    const { name } = req.params;
    const posts = await Post.find({ name: name}, {title:1, name:1, content:1, createdAt:1, _id:0}); // 파라미터로 받은 name이 있는 값을 찾아 posts 배열로 받음
    res.json(posts);
});
//###########################################################################################################//
// 게시글 수정 API
router.patch('/:name', async (req, res) => {
    const { name } = req.params;
    const { title, content, password } = req.body;
    const post = await Post.find({ name });
    const [updatePost] = await Post.find({ name });
    if (!updatePost) {
        return res.status(404).json({success: false, errorMessage: "게시글이 없습니다."})
    }
    if (password !== updatePost.password){
        return res.status(401).json({success: false, errorMessage: "비밀번호가 일치하지 않습니다."});
    }
    await Post.updateOne({name}, {$set: {title, content}});
    res.status(200).json({success: true, message: "수정 완료하였습니다."});
});
//###########################################################################################################//
// 게시글 삭제 API
router.delete('/:name', async (req, res) => {
    const { name } = req.params;
    const { password } = req.body;
    const existPost = await Post.find({ name });
    if (!password) {
        return res.status(400).json({success: false, errorMessage: "비밀번호가 비어있습니다."});
    }
    const [deletePost] = await Post.find({ name });
    if (!deletePost) {
        return res.status(404).json({success: false, errorMessage: "게시글이 없습니다."})
    }
    if (password !== deletePost.password){
        return res.status(400).json({success: false, errorMessage: "비밀먼호가 일치하지 않습니다."});
    }
    if (existPost.length) {
        await Post.deleteOne({ name });
    }
    res.json({ success: true });
});
//###########################################################################################################//
// router 모듈 밖으로 내보내기
module.exports = router;