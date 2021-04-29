const mysql = require('mysql');

const connection = mysql.createPool({
    host: process.env.host,
    user: 'root',
    password: process.env.password,
    database: 'carbay_db',
});

module.exports = connection;
