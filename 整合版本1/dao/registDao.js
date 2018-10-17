function RegistDao() {
    this.init = function () {
        //1,引入MySQL模块
        var mysql = require('mysql');  //调用MySQL模块

        //2，创建一个connection
        this.connection = mysql.createConnection({
            host: 'localhost',       //主机 ip
            user: 'root',            //MySQL认证用户名
            password: '',                //MySQL认证用户密码
            port: '3306',                 //端口号
            database: 'express-login'          //数据库里面的数据
        });
        //3，连接
        this.connection.connect();
    }

    this.insertInfo = function (call,r_email,r_password,user) {
        //1,编写sql语句
        var  userAddSql = 'INSERT INTO user(email,password,user) VALUES(?,?,?)';
        var  userAddSql_Params = [r_email,r_password,user];


        this.connection.query(userAddSql,userAddSql_Params,function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            call(result);
        });

        this.connection.end();
    }

    this.selectEmail = function (call,r_email) {
        var  userGetSql = "SELECT * FROM user where email ='"+r_email+"'";

        this.connection.query(userGetSql, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            call(result);
        });

    }
}
module.exports = RegistDao;