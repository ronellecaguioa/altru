CREATE TABLE users (
  id UUID PRIMARY KEY NOT NULL,
  username VARCHAR(30) NOT NULL,
  email VARCHAR(40),
  thumbnail VARCHAR(100),
);

-- USERS TABLE

CREATE TABLE users (
  id UUID PRIMARY KEY NOT NULL,
  username VARCHAR(24) NOT NULL,
  email VARCHAR(64) NOT NULL,
  password VARCHAR(50) NOT NULL
);

-- sessions table

CREATE TABLE sessions (
  id UUID PRIMARY KEY NOT NULL,
  user_id UUID REFERNCES users (id) NOT NULL, 
  active BIT NOT NULL DEFAULT 1
);

INSERT INTO users (id, username, email, password)
        VALUES (uuid_generate_v4(), 'ronelle', 'me@email.com', crypt('1234', gen_salt('bf', 10)))
        RETURNING *;