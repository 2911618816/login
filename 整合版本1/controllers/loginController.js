exports.login = function(req, res){

    var email = req.body.email;
    var password = req.body.password;
    var LoginService = require('../service/LoginService');
    //创建对象
    var loginService = new LoginService();
    loginService.init();
    //登录信息
    loginService.loginInfo(function(result){
        //把数据传给view
        res.end(JSON.stringify(result));
    },password,email);
};

exports.index=function(req, res){
    res.render('logAndReg',{})
}