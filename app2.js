// 기본 setting
const express = require('express');
const bodyParser = require('body-parser');
const connect = require('./schemas'); // 데이터베이스 관련한거 가져옴
const Post = require('./schemas/posts');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;
connect();

const postsRouter = require('./routes/posts');

const requestMiddleware = (req, res, next) => {
    console.log(["Request URL:", req.originalUrl, "-", new Date()]);
    next();
};

// middleware
app.use(express.json()); // body로 들어오는 json 형태의 데이터 파싱해줌
app.use(express.urlencoded({ extended: false })); // body로 들어오는 urlencoded 형태의 데이터 파싱해줌
app.use(requestMiddleware);
app.use('/posts', postsRouter);

app.get('/', (req, res) => {
    res.send('My blog_deploy test22');
});

// 포트 setting
app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});