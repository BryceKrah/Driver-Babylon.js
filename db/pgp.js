var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var pgp = require('pg-promise')({});

var cn = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
};

var db = pgp(cn);

function createSecure(name, password, callback) {
  //hashing the password given by the user at signup
  bcrypt.genSalt(function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      //this callback saves the user to our databoard
      //with the hashed password
      callback(name,hash);
    })
  })
}

function createUser(req, res, next) {
  createSecure(req.body.name, req.body.password, saveUser);

  function saveUser(name, hash) {
    db.none("INSERT INTO users (name, password_digest) VALUES ($1, $2);", [name, hash])
    .then(function (data) {
      // success;
      console.log("it workd yoo");
      next();
    })
    .catch(function () {
      // error;
      console.error('error signing up');
    });
  }
}

function loginUser(req, res, next) {
  var name = req.body.name
  var password = req.body.password

  db.one("SELECT * FROM users WHERE name LIKE $1;", [name])
    .then((data) => {
      if (bcrypt.compareSync(password, data.password_digest)) {
        res.rows = data
        next()
      } else {
        res.status(401).json({data: "didn't work"})
        next()
      }
    })
    .catch(() => {
      console.error('error finding users')
      next()
    })
}


function editUser(req,res,next) {

  db.one("UPDATE users SET name = $1, password = $2,where user_id = $3)",
  [req.body.name, req.body.password, req.params.uID])
  .then(function(data) {
    next();
  })
  .catch(function(error){
    console.error(error);
  })
};

function deleteUser(req,res,next) {

  db.none("delete from users where user_id=$1)",
  [req.params.uID])
  .then(function() {
    next();
  })
  .catch(function(error){
    console.error(error);
  })
};

module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.editUser = editUser;
module.exports.deleteUser = deleteUser;
