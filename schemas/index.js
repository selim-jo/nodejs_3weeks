// 데이터베이스 setting
const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect('mongodb://localhost:27017/data', { ignoreUndefined: true}).catch((err) => {
        console.error(err);
    });
};

module.exports = connect;