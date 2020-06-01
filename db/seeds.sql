/* Test values for department table */
INSERT INTO department (department)
VALUES 
    ('Sales'),
    ('Engineering'),
    ('Legal'),
    ('Finance');

/* Test values for roles table */
INSERT INTO roles (title, salary, department_id)
VALUES 
    ('Sales Lead', 190000, 1),
    ('Sales person', 100000, 1),
    ('Lead Engineer', 200000, 2),
    ('Software Engineer', 200000, 2),
    ('Legal Team Lead', 350000, 3),
    ('Lawyer', 300000, 3),
    ('Accountant', 150000, 4),
    ('Account Manager', 175000, 4);

/* Test values for employee table */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 2, 2),
    ('Jane', 'Doe', 1, null),
    ('Michael', 'Jackson', 4, 4),
    ('Michelle', 'Smith', 3, null);