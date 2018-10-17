function RegistService(){

    this.init=function(){
        //(1)引入模块
        var RegistDao =  require('../dao/registDao');
        //(2)创建对象
        this.registrDao =  new RegistDao();
        //(3)对象初始化
        this.registrDao.init();
    }

    this.insertInfo=function(call,r_email,r_password,user){

        var resData={
            insertId:-1,
            msg:''
        }
        var r_password=this.crypto(r_password);

        //1,如何存在就直接返回存在的结果

        var that = this;
        this.checkEmail(function(result){
            if(result){
                resData.msg="用户已经存在！"
                call(resData);
            }else{
                that.registrDao.insertInfo(function (data) {
                    resData.msg="注册成功";
                    resData.insertId=data.insertId;
                    call(resData);
                },r_email,r_password,user)
            }
        },r_email)
    }

    this.selectEmail=function (call,r_email) {
        this.registrDao.selectEmail(function(result){
            call(result);
        },r_email);
    }

    this.checkEmail=function(call,r_email){
        this.selectEmail(function(result){
            if(result.length==0){
                call(false);
            }else{
                call(true);
            }
        },r_email);
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
module.exports=RegistService;