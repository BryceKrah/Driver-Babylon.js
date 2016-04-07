DROP TABLE if exists scores CASCADE;
DROP TABLE if exists users CASCADE;
DROP TABLE if exists levels CASCADE;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  password_digest VARCHAR(500)
);

CREATE TABLE levels (
  level_id SERIAL PRIMARY KEY,
  name VARCHAR(50)
);

CREATE TABLE scores (
  user_id INTEGER REFERENCES users,
  level_id INTEGER REFERENCES levels,
  PRIMARY KEY (user_id, level_id),
  score INTEGER
);
