var pgp = require('pg-promise')({});
require('dotenv').config()

var cn = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
};

var db = pgp(cn);

var addHighScore = (req,res,next)=>{
  db.any('INSERT INTO scores (name, score) VALUES (${name}, ${score})',
  {
    name: req.body.name,
    score: req.body.score
 })
 .then((data)=> {
   res.score = data[0];
   next();
 })
 .catch((error) => {
   console.log(error);
   next();
 })
}


var getScores = (req,res,next)=>{
  db.any('SELECT * from scores order by score desc limit 5;')
  .then((data)=>{
    res.scores = data;
    next();
  })
  .catch((error) => {
    console.log(error);
    next();
  })
}

// SELECT * from scores order by score desc limit 5;




module.exports.getScores = getScores;
module.exports.addHighScore = addHighScore;
