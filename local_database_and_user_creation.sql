CREATE ROLE blogapp;

ALTER ROLE blogapp WITH LOGIN PASSWORD 'TODO_PUT_YOUR_STRONG_PASSWORD_HERE' NOSUPERUSER NOCREATEDB NOCREATEROLE;

CREATE DATABASE blog OWNER blogapp;

REVOKE ALL ON DATABASE blog
FROM
    PUBLIC;

GRANT CONNECT ON DATABASE blog TO blogapp;

GRANT ALL ON DATABASE blog TO blogapp;