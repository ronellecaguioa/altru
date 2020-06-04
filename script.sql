CREATE TABLE users (
  id UUID PRIMARY KEY NOT NULL,
  username VARCHAR(30) NOT NULL,
  email VARCHAR(40),
  thumbnail VARCHAR(100),
);