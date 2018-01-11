var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();

var jsonWrite = function(res, ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json({
            code: 200, 
            data: ret, 
            msg: 'success'
        });
    }
};

// 注册接口
router.post('/register', (req, res) => {
    var sql = $sql.user.add;
    var sql_name = $sql.user.select_name;
    var params = req.body;
    console.log(params);
    conn.query(sql_name, params.username, function(err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result.length === 0); //如果查不到数据，则是空数组,长度为0
          
        if(result.length === 0) {
            conn.query(sql, [params.username, params.password], function(err, result) {
                if(err) {
                    console.log(err);
                }
                if(result) {
                    res.json({
                        code: 200,
                        msg: '成功注册'
                    })
                }
            })
        }
        else {
            res.json({
                code: 202,
                msg: '账号已存在'
            })
        }
    })
});

//登录接口
router.post('/login',(req, res) => {
    var sql_name = $sql.user.select_name;
    var sql_pw = $sql.user.select_password;
    var params = req.body;
    conn.query(sql_name, params.username, function(err, result) {
        if(err) {
            console.log(err);
        }
        //若用户名不存在则返回203
        console.log(result);
        if(result[0] === undefined) {
            res.json({
                code: 203,  
                msg: '账号不存在'
            });
        }
        //用户存在且密码正确，返回用户的姓名和用户类型
        else{
            conn.query(sql_pw, [params.username, params.password], function(err, result) {
                console.log(params.password);
                if(err) {
                    console.log(err);
                }
                if(result[0]===undefined) {
                    res.send({msg: '密码错误'});
                }
                else {
                    jsonWrite(res, result);
                }
            })
        }
    })
})

router.post('/selectAll',(req, res) => {
    var params = req.body;
    conn.query('SELECT username from user', function(err, result) {
        if(err) {
            console.log(err);
            res.send(500,{error: '出错'});
        }
        if(result) {
            jsonWrite(res, result);
        }
    })
})



router.post('/select', (req, res) => {
    var sql = $sql.user.select_name;
    var params = req.body;
    console.log(params);
    conn.query(`SELECT * from user where ${params.type}  = ?`, [params.value], function(err, result) {
        console.log(result);
        console.log(res);
        if (err) {
            console.log(err);
        }
        if(result) {
            jsonWrite(res, result);
        }
    })
})

module.exports = router;