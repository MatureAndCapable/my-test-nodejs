module.exports = {
    CODE_ERROR: -1,
    CODE_SUCCESS: 0,
    debug: true, // 控制是否输出大量console.log
    PWD_SALT: 'comm_node', // md5加密时使用
    PRIVATE_KEY: 'comm_node_xyz', // 服务器密钥
    JWT_EXPIRED: 60 * 60, // token认证时长
    CODE_TOKEN_EXPIRED: -2 //token认证失效，返回错误码-2
}

