const db = require("../db/connection");
const { printTable } = require("console-table-printer");

// View All Employees
const viewAllEmployees = () => {
	// const sql = `SELECT a.employee.id, CONCAT(a.employee.first_name, " ", a.employee.last_name) AS name, roles.title, roles.salary, CONCAT(b.employee.first_name, " ", b.employee.last_name) AS manager, FROM employee a LEFT JOIN roles ON roles.id = employee.role_id LEFT JOIN employee b ON b.employee.id = a.employee.manager_id`;
	const sql = `SELECT * FROM employee`;
	db.query(sql).then((res) => printTable(res));
};

// View All Employees By Department
const viewAllEmployeesByDepartment = (id) => {
	const sql = `SELECT employee.id ,CONCAT(employee.first_name, " ", employee.last_name) AS name, roles.title, roles.salary, department.department_name AS department FROM employee LEFT JOIN roles on employee.role_id = roles.id LEFT JOIN department on roles.department_id = department.id WHERE department.id = ?`;
	const params = id;
	db.query(sql, params).then((res) => printTable(res));
};

const viewAllEmployeesByManager = (id) => {
	const sql = `SELECT a.id, a.first_name, a.last_name FROM employee a LEFT JOIN employee b ON b.id = a.manager_id WHERE a.manager_id = ?`;
	const params = id;
	db.query(sql, params).then((res) => printTable(res));
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
