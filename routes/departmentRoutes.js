const db = require("../db/connection");
const { printTable } = require("console-table-printer");

// View All Departments
const viewAllDepartments = () => {
	const sql = `SELECT * FROM department ORDER BY id`;
	db.query(sql).then((res) => printTable(res));
};

// View Department Budget
const departmentBudget = (id) => {
	const sql = `SELECT department.department_name AS Department, 
				SUM(salary) AS Budget 
				FROM roles LEFT JOIN department ON department.id = roles.department_id 
				WHERE department.id = ?`;
	const params = id;

	db.query(sql, params).then((res) => printTable(res));
};

// Add Department
const addDepartment = (id) => {
	const sql = `INSERT INTO department (department_id) VALUES (?)`;
	const params = [id];
	db.query(sql, params).then((res) => console.log("New Department Added"));
};
// Remove Department
const removeDepartment = (id) => {
	const sql = `DELETE FROM department WHERE id = ?`;
	const params = id;

	db.query(sql, params).then((res) => console.log("Department Deleted"));
};

module.exports = {
	viewAllDepartments,
	addDepartment,
	removeDepartment,
	departmentBudget,
};
