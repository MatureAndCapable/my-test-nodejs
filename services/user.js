const { querySql, queryOne } = require('../db')

/**
 * 登录服务
 * @param {*} username 
 * @param {*} password 
 */
function login(username, password) {
    const sql = `select * from user where username='${username}' and password='${password}'`
    return querySql(sql)
}

/**
 * 数据库根据token传来的username查询
 * @param {String} username 
 */
function findUser(username) {
    const sql = `select username,nickname,role,avatar from user where username='${username}'`
    return queryOne(sql)
}

/**
 * 注册服务，将数据存入数据库中
 * @param {*} username 
 * @param {*} password 
 */
function register(username, password, role) {
    const sql = `insert into user (username,password,role) values('${username}','${password}','${role}')`
    return querySql(sql)
}

module.exports = {
    login,
    findUser,
    register
}