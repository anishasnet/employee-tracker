const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'sqlpassword',
    database: 'employees'
});

connection.connect(err => {
    if(err) throw err;
    console.log('Connected as id: ' + connection.threadId);
    firstQuestion();
});


const firstQuestion = function() {
    inquirer.prompt([
        {
            type: "list",
            name: "user purpose",
            message: "What would you like to do?",
            choices: [
                "View All Employees", 
                "Add Employee", 
                "Update Employee Role", 
                "View All Roles", 
                "Add Role", 
                "View All Departments", 
                "Add Department", 
            ],
            validate: choiceSelection => {
                if (choiceSelection) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ])
    .then((purpose) => {
        const userPurpose = purpose['user purpose'];
        console.log(purpose)
        if(userPurpose === "View All Employees"){
            viewAllEmployees();
        }

        if(userPurpose === "Add Employee"){
            addEmployee();
        }

        if(userPurpose === "Update Employee Role"){
            updateEmployeeRole();
        }

        if(userPurpose === "View All Roles"){
            viewAllRoles();
        }

        if(userPurpose === "Add Role"){
            addRole();
        }

        if(userPurpose === "View All Departments"){
            viewAllDepartments();
        }
        if(userPurpose === "Add Department"){
            addDepartment();
        }

    });
}

const viewAllEmployees = () => {
    connection.query(
        'DROP TABLE IF EXISTS joinResult',
        function(err, results) {
            if (err) throw err;
        }
    )
    connection.query(
        'DROP TABLE IF EXISTS employeeWithoutManager',
        function(err, results) {
            if (err) throw err;
    
        }
    )
    connection.query(
        'DROP TABLE IF EXISTS allEmployees',
        function(err, results) {
            if (err) throw err;
            
        }
    )
    connection.query(
        'CREATE TABLE joinResult AS (SELECT roles.roleid, roles.department_id, roles.salary, roles.title, department.department, department.departmentid FROM roles INNER JOIN department ON roles.department_id = department.departmentid);',
        function(err, results) {
            if (err) throw err;
        }
    );
    
    connection.query(
        'CREATE TABLE employeeWithoutManager AS (SELECT employee.employeeid, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, joinResult.roleid, joinResult.title, joinResult.department, joinResult.salary FROM employee INNER JOIN joinResult ON employee.role_id = joinResult.roleid);',
        function(err, results) {
            if (err) throw err;
        }
    )
    connection.query(
        "CREATE TABLE allEmployees AS (SELECT e.employeeid, e.first_name, e.last_name, e.title, e.department, e.salary, CONCAT(m.first_name, ' ', m.last_name) AS 'manager' FROM employeeWithoutManager e LEFT JOIN employeeWithoutManager m ON m.employeeid = e.manager_id)",
        function(err, results) {
            if (err) throw err;
            connection.end();
        }  
    )
    connection.query(
        "SELECT * FROM allEmployees",
        function(err, results) {
            if (err) throw err;
            console.table(results);
            connection.end();
        }
    )
};

viewEmployeesByDepartment = () => {

};

viewEmployeesByManager = () => {

};

addEmployee = () => {

};

removeEmployee = () => {

};

updateEmployeeRole = () => {

};

updateEmployeeManager = () => {

};

viewAllRoles = () => {

};

addRole = () => {

};

removeRole = () => {

};

viewAllDepartments = () => {

};

viewDepartmentBudget = () => {

};

addDepartment = () => {

};

removeDepartment = () => {

};

