var express = require('express');
var morgan = require('morgan');
var expressJwt = require('express-jwt');
var db = require('./db/pgp.js');
var bodyParser = require('body-parser');
var jsonwebtoken = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var path = require('path');
var app = express();
var userRoutes = require(path.join(__dirname, '/routes/userRoutes.js'));

require('dotenv').config()

if(process.env.ENVIRONMENT === 'production'){
  var cn = process.env.DATABASE_URL;
} else {
  var cn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname, '/views', 'index.html'))
})

app.get('/scores', db.getScores, function(res,res){
  res.send(res.scores)
})

app.get('/level_one', function(req,res){
  res.sendFile(path.join(__dirname, '/views', 'level_one.html'))
})
app.post('/level_one', db.addHighScore, function(req,res){
  res.send(res.score)
})

app.get('/level_two', function(req,res){
  res.sendFile(path.join(__dirname, '/views', 'level_two.html'))
})


var port = process.env.PORT || 3000;
var server = app.listen(port, function(){
  console.log("up and running");
})
