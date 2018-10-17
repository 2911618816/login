exports.regist = function(req, res){

    var email = req.body.r_email;
    var password = req.body.r_password;
    var user = req.body.user

    //(1),引入UserService模块
    var RegistService = require('../service/registerService');
    //(2),创建UserService对象
    var registService = new RegistService();
    registService.init();
    //(3),插入用户
    registService.insertInfo(function(result){
        //3,把数据传给view
        res.end(JSON.stringify(result));
    },email,password,user);
};
