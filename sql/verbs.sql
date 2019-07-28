DROP TABLE IF EXISTS verbs;

CREATE TABLE verbs(
    id SERIAL PRIMARY KEY,
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
    finalverb VARCHAR(255)
);
