let mysql = require('mysql');

let pool = mysql.createPool({
    connectionLimit: 100, //important
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'address_book',
    debug: false
});

module.exports = {pool};