const mysql = require('mysql');
const config = require('./config');
const debug = require('../utils/constant').debug

function connect() {
    return mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database,
        multipleStatements: true
    })
}

function querySql(sql) {
    const conn = connect();
    debug && console.log(sql);
    return new Promise((resolve, reject) => {
        try {
            conn.query(sql, (err, results) => {
                if (err) {
                    debug && console.log('请求失败，原因：' + JSON.stringify(err));
                    reject(err);
                } else {
                    debug && console.log('请求成功', JSON.stringify(results));
                    resolve(results);
                }
            })
        } catch (e) {
            reject(e);
        } finally {
            conn.end();//必须释放连接，否则会导致内存泄漏
        }
    })
}

/**
 * 返回第一条查询结果
 * @param {String} sql 
 */
function queryOne(sql) {
    return new Promise((resolve, reject) => {
        querySql(sql)
            .then(results => {
                if (results && results.length > 0) {
                    resolve(results[0])
                } else {
                    resolve(null)
                }
            })
            .catch(error => {
                reject(error)
            })
    })
}

module.exports = {
    querySql,
    queryOne
}