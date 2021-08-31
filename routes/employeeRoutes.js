const db = require("../db/connection");
const { printTable } = require("console-table-printer");

// View All Employees
const viewAllEmployees = () => {
	const sql = `SELECT e.id, 
				CONCAT(e.first_name, " ", e.last_name) AS Employee,
				roles.title,
				department.department_name,
				roles.salary,
				CONCAT(m.first_name, " ", m.last_name) AS Manager
				FROM employee e
				LEFT JOIN employee m ON
					m.id = e.manager_id
				LEFT JOIN roles ON
					roles.id = e.role_id
				LEFT JOIN department ON
					department.id = roles.department_id`;
	db.query(sql).then((res) => printTable(res));
};

// View All Employees By Department
const viewAllEmployeesByDepartment = (id) => {
	const sql = `SELECT employee.id ,
				CONCAT(employee.first_name, " ", 
				employee.last_name) AS name, 
				roles.title, roles.salary, 
				department.department_name AS department 
				FROM employee 
				LEFT JOIN roles ON employee.role_id = roles.id 
				LEFT JOIN department ON roles.department_id = department.id 
				WHERE department.id = ?`;
	const params = id;
	db.query(sql, params).then((res) => printTable(res));
};

const viewAllEmployeesByManager = (id) => {
	const sql = `SELECT e.id,
				CONCAT(e.first_name, " ", e.last_name) AS employee,
				roles.title, roles.salary
				FROM employee e
				LEFT JOIN roles ON
					roles.id = e.role_id
				LEFT JOIN employee m ON
					m.id = e.manager_id
				WHERE e.manager_id = ?`;
	const params = id;
	db.query(sql, params).then((res) => {
		if (!res[0]) {
			console.log("This Employee Does Not Manage Any Employees");
			return;
		}

		printTable(res);
	});
};

// Add Employee
const addEmployee = (first, last, role, manager_id) => {
	const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
	const params = [first, last, role, manager_id];

	db.query(sql, params).then((res) => console.log("New Employee Added"));
};

// Remove Employee

const removeEmployee = (id) => {
	const sql = `DELETE FROM employee WHERE id = ?`;
	const params = id;

	db.query(sql, params).then((res) => console.log("Employee Deleted"));
};

// Update Employee
const updateEmployee = (id, first, last) => {
	const sql = `UPDATE employee SET first_name = ?, last_name = ? WHERE id = ?`;
	const params = [first, last, id];

	db.query(sql, params).then((res) => console.log("Employee Updated"));
};

// Update Employee Role
const updateEmployeeRole = (id, role) => {
	const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
	const params = [role, id];

	db.query(sql, params).then((res) => console.log("Employee Updated"));
};

// Update Employee Manager
const updateEmployeeManager = (id, manager) => {
	const sql = `UPDATE employee SET manager_id = ? WHERE id = ?`;
	const params = [manager, id];

	db.query(sql, params).then((res) => console.log("Employee Updated"));
};

module.exports = {
	viewAllEmployees,
	viewAllEmployeesByDepartment,
	addEmployee,
	removeEmployee,
	updateEmployee,
	updateEmployeeRole,
	updateEmployeeManager,
	viewAllEmployeesByManager,
};
