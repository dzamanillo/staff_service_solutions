DROP DATABASE IF EXISTS staff_service_solutions;
CREATE DATABASE staff_service_solutions;

USE staff_service_solutions;

CREATE TABLE department (
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30)
);

CREATE TABLE roles (
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER,
    manager_id INTEGER,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id)
);