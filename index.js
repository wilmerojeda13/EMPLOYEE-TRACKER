// require modules
const mysql = require('mysql2');
const inquirer = require('inquirer');
const table = require('console.table');

// Create a connection 
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Wilmercito1997',
    database: 'employees'
});

connection.connect(err => {
    if(err) throw err;
    console.log('Welecome to Employee Tracker');
    startQuestions();
})

const startQuestions =() => {
    inquirer.prompt([
        {
            type: 'list',
            name:'menu',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update employee job',
                'Exit',

            ],
        }
    ])
    .then(response => {
        switch (response.questions) {
        case 'View all departments':
            viewDepartment();
            break;
        case 'View all roles':
            viewRoles();
            break;
        case 'View all employees':
            viewEmployees();
            break;
        case 'Add a department':
            ddDepartment();
             break;
        case  'Add a role':
            addRole();
            break;
        case 'Add an employee':
            addEmployee();
            break;
        case 'Update employee job':
            updateEmployee();
            break;
        case 'Exit':
            connection.end();

        }
    });
};


