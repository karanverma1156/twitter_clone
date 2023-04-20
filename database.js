const mysql = require('mysql');

let conn;

conn = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'root123',
    database:'twitter_database'
});

conn.connect(function(error){
    if(error)
    {
        throw error;
    }
    else{
        console.log('db connected');
    }
});

module.exports = conn;