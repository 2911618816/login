var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();
app.set('view engine','html');
app.set('views',path.join(__dirname,'views'));
app.engine('html',require('ejs').__express);
app.use(express.static('public'));
// app.use(cookieParser());
// app.use(session({
//     secret: '12345',
//     name: 'express_cookie',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
//     cookie: {maxAge: 80*1000 },     //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
// }));

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});
var loginController = require('./controller/loginController');
var registController = require('./controller/registController');


app.get('/logAndReg', loginController.index);
app.post('/login',urlencodedParser, loginController.login);
app.post('/regist',urlencodedParser, registController.regist);

app.get('/cart', function (req, res) {
    res.render('cart',{});
});

app.get('/categories', function (req, res) {
    res.render('categories',{});
});

app.get('/checkout', function (req, res) {
    res.render('checkout',{});
});

app.get('/contact', function (req, res) {
    res.render('contact',{});
});

app.get('/index', function (req, res) {
    res.render('index',{});
});

app.get('/product', function (req, res) {
    res.render('product',{});
});


app.listen(8888);