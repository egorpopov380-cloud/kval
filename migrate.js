const pg = require('pg-promise')()
require('dotenv').config();

const connect = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    ssl: {
        rejectUnauthorized: false,
    }
}

const PostgreDB = pg(connect);

async function runMigrate() {
    try {
        await PostgreDB.query(`CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            login VARCHAR(255) UNIQUE,
            pass VARCHAR(255),
            fio VARCHAR(255),
            phone VARCHAR(255),
            email VARCHAR(255)
            );`
        );

        console.log('Created table users');

        await PostgreDB.query(`CREATE TABLE IF NOT EXISTS request (
            id SERIAL PRIMARY KEY,
            users_id INTEGER,
            name_course VARCHAR(255),
            start_date TIMESTAMP,
            type_pay VARCHAR(255),
            status VARCHAR(255),
            review VARCHAR(255),
            end_date TIMESTAMP,
            FOREIGN KEY (users_id) REFERENCES users (id)
            );`
        )

        console.log('Created table request');
    } catch (error) {
        console.error("Failed Migrate", error);
    }
}

runMigrate();