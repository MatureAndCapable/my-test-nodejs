const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser')
const cors = require('cors');

const app = express();//创建express应用

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// 将全局的路由托管到这里来处理
app.use('/', router)

//使express监听5000端口号发起的http请求
const server = app.listen(5000, function () {
    const { address, port } = server.address();
    console.log('Http Server is running on http://%s:%s', address, port);
})
