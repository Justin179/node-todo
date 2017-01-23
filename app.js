var express = require('express');
var app = express();

// 靜態資源 - deliver straight to the browser
app.use('/assets',express.static(__dirname+'/public'));

// setup server side templating
app.set('view engine','ejs');

var port = process.env.PORT || 3000;
app.listen(port);