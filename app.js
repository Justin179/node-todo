var express = require('express');
var app = express();

var mongoose = require('mongoose');
// 取得連線url
var config = require('./config'); // 這樣就會執行到index.js
// binding
mongoose.connect(config.getDbConnectionString());

// when require, you get a function in return
var setupController = require('./controller/setupController');
setupController(app);

var apiController = require('./controller/apiController');
apiController(app);

// 靜態資源 - deliver straight to the browser
app.use('/assets',express.static(__dirname+'/public'));

// setup server side templating
app.set('view engine','ejs');

var mongo = require('mongodb');



// 首頁 localhost:3000
app.get('/', function(req, res) {
	res.render('index'); // 會自動找views目錄下的index
});

// 查詢http request
app.get('/get-data',function(req,res,next){
    
    var resultArray = [];

    mongo.connect(url,function(err,conn){
        var cursor = conn.collection('user-data').find();
        cursor.forEach(function(doc,err){
            resultArray.push(doc);
        },function(){
            conn.close();
            res.render('index',{items: resultArray});
        });
    });
});

// 新增http request
app.post('/insert',function(req,res,next){
    
    console.log(req.body);
    // 從body把值取出，放到物件內
    // var item = {
    //     title: req.body.title,
    //     content: req.body.content
    // }

    // // 連線&寫入
    // mongo.connect(url,function(err,conn){
    //     conn.collection('user-data').insertOne(item,function(err,result){
    //         console.log('Item inserted');
    //         conn.close();
    //     });
    // });

    // // 寫入後，導回首頁
    // res.redirect('/');
});

// 修改http request
app.post('/update',function(req,res,next){

});

// 刪除http request
app.post('/delete',function(req,res,next){

});


// db name: test
var url = 'mongodb://localhost:27017/test';






var port = process.env.PORT || 3000;
app.listen(port);