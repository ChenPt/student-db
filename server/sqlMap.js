// sql语句
var sqlMap = {
    // 用户
    user: {
        add: 'insert into user(username, age) values (?, ?)',
        select_name: 'SELECT * from user where username = ?'
    }
}

module.exports = sqlMap;