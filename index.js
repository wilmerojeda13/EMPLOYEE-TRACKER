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

// Intoduction for my employee tracker
connection.connect(err => {
    if(err) throw err;
    console.log("***************************************************")
    console.log("***************************************************")
    console.log("****                                          *****")
    console.log("****                                          *****")
    console.log("****                                          *****")
    console.log("****     WELCOME TO MY EMPLOYEE TRACKER       *****")
    console.log("****                                          *****")
    console.log("****                                          *****")
    console.log("***************************************************")
    console.log("***************************************************")
    startMenu();
})

// PROMPT USER QUESTIONS START MENU
const startMenu = () => {
    return inquirer
    .prompt({
        type: 'list',
        name: 'menu',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all role', 'Add a Department','Add a role','Add an employee','View all Employee','Update an employee role']
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
                case 'View all Employee':
                viewAllEmployee();
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
    ])
    .then((answer) => {
        let sql = `INSERT INTO role (title,salary,department_id) VALUES (?,?,?)`
        let params = [answer.title,answer.salary,answer.departmentId]
        connection.promise().query(sql, params)
        console.log(`The role ${answer.title} Its been added to the db`);
        startMenu()
    })
}
        
    

//CREATE FUNCTION TO VIEW ALL EMPLOYEE
const viewAllEmployee = () => {
    let sql = `SELECT * FROM employee`;
    connection.promise().query(sql)
    .then(([rows,fields]) => {
        (console.table(rows))
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
        if(answer.manager_id ==="") {
            answer.manager_id = null
        }
        const params = [answer.first_name, answer.last_name, answer.role_id, answer.manager_id]
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`
        connection.promise().query(sql,params)
        .then((rows,fields) => {
            console.log('The employee has been created');
        startMenu()
        })
    })
}

//CREATE FUNCTION TO UPDATE AN EMPLOYEE
const updateEmployee = () => {
    const sqlEmployee = `SELECT employee.first_name,employee.last_name FROM employee`;
    let employeeArr= []
    connection.promise().query(sqlEmployee)
    .then(([rows,fields]) => {
        const first_name = rows.first_name;
        const last_name = rows.last_name;
        employeeArr = rows.map(rows => `${rows.first_name} ${rows.last_name}`)
        inquirer
        .prompt([
            {
                type:'list',
                name:'fullName',
                message:'Which employee role you want to update',
                choices: employeeArr
            },
            {
                type:'input',
                name:'roleId',
                message:'Insert the id of the employee new role (If you want to add new role for the employee select "add new role" from the main menu',
            },
        ]).then((answer) => {
            let sql = `UPDATE employee
            SET role_id = ?
            WHERE first_name= ? AND last_name= ?`;
            let params = [answer.role_id, answer.fullName.split(" ")[0], answer.fullName.split(" ")[0]]
            connection.promise().query(sql,params)
            console.log(`Role updated`);
            startMenu()
        })
    })
}





