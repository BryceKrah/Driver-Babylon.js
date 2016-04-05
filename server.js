var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res){
  res.sendFile('./views/index.html')
})

app.get('/level_one', function(req,res){
  res.sendFile('./views/level_one.html')
})


var port = process.env.PORT || 3000;
var server = app.listen(port, function(){
  console.log("up and running");
})
