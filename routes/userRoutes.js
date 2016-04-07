var express     = require('express');
var expressJWT  = require('express-jwt');
var jwt         = require('jsonwebtoken');
var userRoutes  = express.Router();
var bodyParser  = require('body-parser');
var db          = require('../db/pgp.js');
var secret      = process.env.secret;

userRoutes.route('/')
  .get( function(req,res){
    res.json( {data: 'yooo'} )
  })
  .post(db.createUser, function(req,res){
    res.redirect('/');
  })

userRoutes.post('/login', db.loginUser, function(req,res){
  var token = jwt.sign(res.rows, secret);
  res.redirect('/')
})

module.exports = userRoutes;
