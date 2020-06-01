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

function myFindIndex(list, name) {
    for (var i = 0; i < list.length; i++) {
        if (list[i] == name) {
            return i;
        }
    }
}

const firstQuestion = function() {
    inquirer.prompt([
        {
            type: "list",
            name: "userPurpose",
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
        const userPurpose = purpose['userPurpose'];
        if(userPurpose === "View All Employees"){
            viewAllEmployees();
            firstQuestion();
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
        }  
    )
    connection.query(
        "SELECT * FROM allEmployees ORDER BY allEmployees.employeeid",
        function(err, results) {
            if (err) throw err;
            console.log('\n')
            console.table(results);
            firstQuestion();
        }
    )
    
};

const viewEmployeesByDepartment = () => {

};

const viewEmployeesByManager = () => {

};

const addEmployee = () => {
    var currentRoles =  [];
    let currentManagers = ['None'];
    connection.query(
        'SELECT roles.title FROM roles',
        function(err, results) {
            if (err) throw err;
            results.forEach(element => {
                currentRoles.push(element.title);
            })
        }
    )
    connection.query(
        'SELECT employee.first_name, employee.last_name FROM employee',
        function(err, results) {
            results.forEach(element => {
                currentManagers.push(element.first_name + " " + element.last_name);
            })
        }
    )
    inquirer.prompt([
        {
            type: "text",
            name: "firstName",
            message: "What is the employee's first name?",
            validate: firstNameInput => {
                if (firstNameInput) {
                    return true;
                } else {
                    console.log("Please enter the employee's first name");
                    return false;
                }
            }
        },
        {
            type: "text",
            name: "lastName",
            message: "What is the employee's last name?",
            validate: lastNameInput => {
                if (lastNameInput) {
                    return true;
                } else {
                    console.log("Please enter the employee's last name");
                    return false;
                }
            }
        },
        {
            type: "list",
            name: "role",
            message: "What is the employee's role?",
            choices: currentRoles,
        },
        {
            type: "list",
            name: "manager",
            message: "Who is the employee's manager?",
            choices: currentManagers,
        }
    ]).then( answers => {
        var roleId = myFindIndex(currentRoles, answers.role) + 1;
        var managerId;
        if (answers.manager == "None") {
            managerId = null;
        } else {
            managerId = myFindIndex(currentManagers, answers.manager);
        }
        
        connection.query(
            'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (? , ? , ? , ?)',
            [answers.firstName, answers.lastName, roleId, managerId],
            function(err, results) {
                if (err) throw err;
                return;
            }
        )
        firstQuestion();
    })

};

const removeEmployee = () => {

};

const updateEmployeeRole = () => {

};

const updateEmployeeManager = () => {

};

const viewAllRoles = () => {
    connection.query(
        'SELECT roles.roleid, roles.title, department.department, roles.salary FROM roles INNER JOIN department ON roles.department_id = department.departmentid',
        function(err, results) {
            if (err) throw err;
            console.log("\n");
            console.table(results);
            firstQuestion();
        }
    )
    
};

const addRole = () => {
    var departments = [];
    connection.query(
        'SELECT department.department FROM department',
        function(err, results) {
            if (err) throw err;
            results.forEach(element => {
                departments.push(element.department);
            })
        }
    )
    inquirer.prompt([
        {
            type: "text",
            name: "title",
            message: "What is the title of the new role?",
            validate: titleInput => {
                if (titleInput) {
                    return true;
                } else {
                    console.log("Please enter a title for the role")
                    return false;
                }
            }
        },
        {
            type: "text",
            name: "salary",
            message: "What is the salary of the new role?",
            validate: salaryInput => {
                if (salaryInput && parseInt(salaryInput) == salaryInput) {
                    return true;
                } else {
                    console.log("Please enter a valid salary");
                    return false;
                }
            }
        },
        {
            type: "list",
            name: "department",
            message: "Which department is this role a part of?",
            choices: departments
        }
    ]).then( answers => {
        let departmentId = myFindIndex(departments, answers.department);
        connection.query(
            'INSERT INTO roles (title, salary, department_id) VALUES (? , ? , ? );',
            [answers.title, answers.salary, departmentId],
            function(err, results) {
                if (err) throw err;
                console.log('Role successfully added.')
                firstQuestion();
            }
        )
    })    
};

const removeRole = () => {

};

const viewAllDepartments = () => {
    connection.query('SELECT * FROM department', function(err,results) {
        if (err) throw err;
        console.table(results);
    })
};

const viewDepartmentBudget = () => {

};

const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the department you would like to add?",
            name: "addDepartment",
            validate: departmentName => {
                if(departmentName.match("[a-zA-Z]+$")) {
                    return true;
                } else {
                    console.log("That is not a valid department name. Please enter it again.");
                    return false;
                }
            }
        }
    ])
    .then(answer => {
        const sqlEntry = `INSERT INTO department (department) 
        VALUES (?)`;
        connection.query(sqlEntry, answer.addDepartment, (err, result) => {
            if(err) throw err;
            console.log("The department " + answer.addDepartment + " has been added.");
            viewAllDepartments();
        })
    })
};

const removeDepartment = () => {

};