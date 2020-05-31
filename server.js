const inquirer = require("inquirer");
const mysql = require('mysql2');


const firstQuestion = function() {
    inquirer.prompt([
        {
            type: "list",
            name: "user purpose",
            message: "What would you like to do?",
            choices: [
                "View All Employees", 
                "View Employees By Department",
                "View Employees By Manager",
                "Add Employee", 
                "Remove Employee",
                "Update Employee Role", 
                "Update Employee Manager",
                "View All Roles", 
                "Add Role", 
                "Remove Role",
                "View All Departments", 
                "View Department Budget",
                "Add Department", 
                "Remove Department",
                
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
    .then((purposes) => {
        const{userPurpose} = purposes;

        if(userPurpose === "View All Employees"){
            viewAllEmployees();
        }

        if(userPurpose === "View Employees By Department"){
            viewEmployeesByDepartment();

        }

        if(userPurpose === "View Employees By Manager"){
            viewEmployeesByManager();
        }

        if(userPurpose === "Add Employee"){
            addEmployee();
        }

        if(userPurpose === "Remove Employee"){
            removeEmployee();
        }

        if(userPurpose === "Update Employee Role"){
            updateEmployeeRole();
        }

        if(userPurpose === "Update Employee Manager"){
            updateEmployeeManager();
        }

        if(userPurpose === "View All Roles"){
            viewAllRoles();
        }

        if(userPurpose === "Add Role"){
            addRole();
        }

        if(userPurpose === "Remove Role"){
            removeRole();
        }

        if(userPurpose === "View All Departments"){
            viewAllDepartments();
        }

        if(userPurpose === "View Department Budget"){
            viewDepartmentBudget();
        }

        if(userPurpose === "Add Department"){
            addDepartment();
        }

        if(userPurpose === "Remove Department"){
            removeDepartment();
        }
    });
}

viewAllEmployees = () => {

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
