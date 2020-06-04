CREATE TABLE users (
  id UUID PRIMARY KEY NOT NULL,
  username VARCHAR(30) NOT NULL,
  email VARCHAR(40),
  thumbnail VARCHAR(100),
);

-- USERS TABLE

CREATE TABLE users (
  id UUID PRIMARY KEY NOT NULL,
  githubid VARCHAR(30) NOT NULL,
  name VARCHAR(24) NOT NULL,
  username VARCHAR(30) NOT NULL,
  email VARCHAR(48)
);

-- test table
CREATE TABLE sample (
  id UUID PRIMARY KEY NOT NULL,
  username VARCHAR(24) NOT NULL UNIQUE, 
  name VARCHAR(24) NOT NULL
);

INSERT INTO sample (id, username, name)
VALUES (uuid_generate_v4(), 'rawrnell', 'Ronelle');

INSERT INTO sample (id, username, name)
VALUES (uuid_generate_v4(), 'redcassie683', 'Cassandra');

INSERT INTO sample (id, username, name)
VALUES (uuid_generate_v4(), 'hoonrietta', 'Hoonry');

-- ALTER TABLE sample
-- ADD CONSTRAINT username UNIQUE;

INSERT INTO sample (id, username, name)
VALUES (uuid_generate_v4(), 'hoonrietta', 'Hoobert')
ON CONFLICT SELECT * FROM sample WHERE username = 'hoonrietta';
