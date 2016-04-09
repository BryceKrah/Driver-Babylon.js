var pgp = require('pg-promise')({});
require('dotenv').config()


if(process.env.ENVIRONMENT === 'production'){
  var cn = process.env.DATABASE_URL;
} else {
  var cn = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@localhost/${process.env.DB_NAME}`
}



var db = pgp(cn);

var addHighScore = (req,res,next)=>{
  db.none('INSERT INTO scores (name, score) VALUES (${name}, ${score})', req.body)
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
