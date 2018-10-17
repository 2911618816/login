function LoginService() {
    this.init = function () {
        var LoginDao = require("../dao/loginDao")
        this.loginDao = new LoginDao();
        this.loginDao.init();
    }

    this.selectPassword=function (call,email) {
        this.loginDao.selectPassword(function (result) {
            call(result);
        },email)
    }

    this.loginInfo=function (call,password,email) {
        var response={
            state:0,
            msg:''
        }
        var password=this.crypto(password);

        this.checkPassword(function(result){
            if(result){
                response.state=1;
                response.msg="登录成功！";
                call(response);
            }else{
                response.state=-1;
                response.msg="无该用户名或者密码输入错误！";
                call(response);
            }
        },email,password)
    }

    this.checkPassword=function(call,email,password){
        this.selectPassword(function(result){
            if(result[0].password==password){
                call(true);
            }else{
                call(false);
            }
        },email);
    }

    this.crypto=function(data){
        var crypto = require('crypto');
        //2，生成口令的散列值，crypto模块功能是加密并生成各种散列，createHash(algorithm)方法 ,这是利用给定的算法生成hash对象
        var md5 = crypto.createHash('md5');
        //3,digest([encoding])方法，计算数据的hash摘要值，encoding是可选参数，不传则返回buffer (encoding可为 'hex'、'base64'等)；
        var buffer = md5.update(data).digest('hex');
        return buffer;
    }

}

module.exports = LoginService;