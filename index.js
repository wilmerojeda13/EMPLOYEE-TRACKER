// require modules
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

// Create a connection 
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Wilmercito1997',
    database: 'employees'
});


const startMenu = () => {
    return inquirer
    .prompt({
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all role', 'Add a Department','Add a role','Add an employee','Update an employee role']
    }).then(response => {
        switch (response.menu) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all role':
                viewRole();
                break;
            case 'Add a Department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployee();
                break;
            default:
            break
            
        }
    });
};

// CREATING THE FUNCTION FOR THE VIEW DEPARTMENT 
const viewDepartments = () => {
    let sql = `SELECT * FROM departments`;
    connection.promise().query(sql)
    .then(([rows,fields]) => {
        (console.table(rows))
        startMenu()
    })
}

//CREATE A FUNCTION TO VIEW ALL ROLE
const viewRole = () => {
    let sql = `SELECT role.title AS Title, role.salary AS salary, departments.name AS Departments 
    FROM role JOIN departments ON role.department_id = departments.id`;
    connection.promise().query(sql)
    .then(([rows,fields]) => {
        (console.table(rows))
        startMenu()
    })
};

//CREATE A FUNCTION TO ADD A DEPARTMENT
const addDepartment = () => {
    return inquirer
    .prompt({
        type:'input',
        name: 'department',
        message:'What is the name of the department',
    }).then((answer) =>{
        let sql = `INSERT INTO departments (name) VALUES (?)`
        let params = [answer.department]
        connection.promise().query(sql, params)
        console.log(`The department ${answer.department} Its been added to the db`);
        startMenu()
    })
}

//CREATE A FUNCTION TO ADD A ROLE
const addRole = () => {
    return inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the new role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the new role?'
        },
        {
            type:'input',
            name:'departmentId',
            message:'What is the department id of this new role?'
        }
    ]).then((answer) =>{
        let sql = `INSERT INTO role (title,salary,department_id) VALUES (?,)`
        let params = [answer.title, answer.salary,answer.departmentId]
        connection.promise().query(sql, params)
        console.log(`The role ${answer.title} Its been added to the db`);
        startMenu()
    })
}

//CREATE A FUNCTION TO ADD EMPLOYEE
const addEmployee = () => {
    return inquirer
    .prompt([
        {
            type:'input',
            name:'first_name',
            message:'What is the first name of the new employee'
        },
        {
            type:'input',
            name:'last_name',
            message:'What is the last name of the new employee'
        },
        {
            type:'input',
            name:'role_id',
            message:'What is the id of the new role'
        },
        {
            type:'input',
            name:'manager_id',
            message:'What is the id of the manager'
        }
    ]).then((answer) => {
        const params = [answer.first_name, answer.las_name, answer.role_id, answer.manager_id]
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (????)`
        connection.promise().query(sql,params)
    })
}

const updateEmployee = () => {
    
}

startMenu()




