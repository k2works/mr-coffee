const express = require('express');
const app = express();
const IndexController = require('./controller/IndexController');
const HelloController = require('./controller/HelloController');

// CORSを許可する
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//静的ファイル
app.use(express.static('resources/static'));

//viewの設定
app.use(express.static('./src/resources/static'));
app.set('views', './src/resources/templates');
//viewエンジンをejsであることを設定
app.set("view engine", "ejs");
//  拡張子 htm,htmlのテンプレートエンジンを指定
app.engine('htm', require('ejs').renderFile);
app.engine('html', require('ejs').renderFile);
const INDEX = '/';
const HELLO = '/hello';

app.use(INDEX, IndexController);
app.use(HELLO, HelloController);

// Export your Express configuration so that it can be consumed by the Lambda handler
module.exports = app;
