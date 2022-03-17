// require modules
const mysql = require('mysql2');
const inquirer = require('inquirer');
const table = require('console.table');

// Create a connection 
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3302,
    user: 'root',
    password: 'password234',
    database: 'employees'
});

