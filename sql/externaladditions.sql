DROP TABLE IF EXISTS externaladditions;

CREATE TABLE externaladditions(
    id SERIAL PRIMARY KEY,
    userId INTEGER,
    type VARCHAR(255) not null,
    verbId INTEGER,
    haupt INTEGER,
    neben INTEGER,
    prefix INTEGER,
    prfword VARCHAR(255),
    prffirst VARCHAR(255),
    prfsecond VARCHAR(255),
    verb VARCHAR(255),
    example VARCHAR(1255),
    particip VARCHAR(1255),
    noun VARCHAR(1255),
    adjective VARCHAR(1255),
    approved Boolean,
    dismissed Boolean,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
