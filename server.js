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


app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/users', userRoutes);

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname, '/views', 'index.html'))
})

app.get('/level_one', function(req,res){
  res.sendFile(path.join(__dirname, '/views', 'level_one.html'))
})

app.get('/level_two', function(req,res){
  res.sendFile(path.join(__dirname, '/views', 'level_two.html'))
})


var port = process.env.PORT || 3000;
var server = app.listen(port, function(){
  console.log("up and running");
})
