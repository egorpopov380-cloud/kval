const pg = require('pg-promise')()
const path = require("node:path");
const env = path.resolve(__dirname, '../../.env');
require('dotenv').config({ path: env });

const connect = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    ssl: {
        rejectUnauthorized: false,
    }
}

const DB = pg(connect);

module.exports = DB;
