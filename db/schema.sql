DROP TABLE if exists scores CASCADE;

CREATE TABLE scores (
  id SERIAL PRIMARY KEY,
  score INTEGER,
  name VARCHAR(3)
);
