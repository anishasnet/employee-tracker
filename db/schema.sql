DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
  departmentid INTEGER PRIMARY KEY AUTO_INCREMENT,
  department VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    roleid INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(16,0) NOT NULL,
    department_id INTEGER
);

CREATE TABLE employee (
    employeeid INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER
);
