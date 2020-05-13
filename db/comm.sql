create database `comm`;
use `comm`;

-- ----------------------------
-- Table structure for user
-- ----------------------------
drop table if exists `user`;
CREATE TABLE user
(
    `username` varchar(100) not null primary key,
    `password` varchar(100) not null,
    `role` varchar(10) not null,
    `nickname` varchar(50) DEFAULT null,
    `avatar` varchar(255) DEFAULT null
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('fh@gmail.com', 'cfadd428d2b97a0d98207be731e10260', 'admin', 'sam', 'https://www.youbaobao.xyz/mpvue-res/logo.jpg');
INSERT INTO `user` VALUES ('sam', 'f315515a2ce0a887dd1cc0e00cdca0e4', 'admin', 'sam', 'https://www.youbaobao.xyz/mpvue-res/logo.jpg');
INSERT INTO `user` VALUES ('nick', 'f315515a2ce0a887dd1cc0e00cdca0e4', 'editor', 'nick', 'https://www.youbaobao.xyz/mpvue-res/logo.jpg');
COMMIT;