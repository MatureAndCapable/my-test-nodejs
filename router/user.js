const express = require('express')
const Result = require('../models/Result')
const { login, findUser, register } = require('../services/user')
const { md5, decode } = require('../utils')
const { PWD_SALT } = require('../utils/constant')
const { body, validationResult } = require('express-validator')
const boom = require('boom')

const jwt = require('jsonwebtoken')
const { PRIVATE_KEY, JWT_EXPIRED } = require('../utils/constant')


const router = express.Router()

// 嵌套路由
// router.post(
//     '/login',
//     [
//         body('username').isEmail().withMessage('username类型不正确'),
//         body('password').isLength({ min: 6 }).withMessage('password类型不正确')
//     ],
//     (req, res, next) => {
//         const err = validationResult(req)
//         if (!err.isEmpty()) {
//             const [{ msg }] = err.errors
//             next(boom.badRequest(msg))
//         } else {
//             const username = req.body.username
//             const password = md5(`${req.body.password}${PWD_SALT}`)
//             login(username, password).then(user => {
//                 if (!user || user.length === 0) {
//                     new Result('登录失败').fail(res)
//                 } else {
//                     new Result('登录成功').success(res)
//                 }
//             })
//         }
//     })
router.post('/login', function (req, res, next) {
    const username = req.body.username
    const password = md5(`${req.body.password}${PWD_SALT}`)
    login(username, password).then(user => {
        if (!user || user.length === 0) {
            new Result('登录失败').fail(res)
        } else {
            const token = jwt.sign(
                { username },
                PRIVATE_KEY,
                { expiresIn: JWT_EXPIRED }
            )
            new Result({ token }, '登录成功').success(res)
        }
    })
})

router.post('/register', function (req, res, next) {
    const username = req.body.username
    const password = md5(`${req.body.password}${PWD_SALT}`)
    const role = req.body.role
    register(username, password, role).then(result => {
        new Result('注册成功').success(res)
    }, err => {
        if (err.code === 'ER_DUP_ENTRY') {
            new Result('该用户已存在').fail(res)
        } else {
            new Result('注册失败').fail(res)
        }
    })
})

router.get('/info', function (req, res, next) {
    const decoded = decode(req)
    if (decoded && decoded.username) {
        findUser(decoded.username).then(user => {
            if (user) {
                user.roles = [user.role]
                new Result(user, '获取用户信息成功').success(res)
            } else {
                new Result('获取用户信息失败').fail(res)
            }
        })
    } else {
        new Result('用户信息解析失败').fail(res)
    }
})


module.exports = router