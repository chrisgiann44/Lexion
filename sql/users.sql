DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) not null,
    surname VARCHAR(255) not null,
    email VARCHAR(255) not null UNIQUE,
    password VARCHAR(255) not null,
    pic_url VARCHAR,
    applied boolean,
    admin boolean,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
