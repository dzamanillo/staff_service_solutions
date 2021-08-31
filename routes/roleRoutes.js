const db = require("../db/connection");
const { printTable } = require("console-table-printer");

// View All Roles
const viewAllRoles = () => {
	const sql = `SELECT roles.id, roles.title, department.department_name, roles.salary 
				FROM roles
				LEFT JOIN department ON
				department.id = roles.department_id
				ORDER BY department_name, salary DESC`;
	db.query(sql).then((res) => printTable(res));
};

const addRole = (title, salary, dep) => {
	const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`;
	const params = [title, salary, dep];
	db.query(sql, params).then((res) => console.log("New Role Added"));
};

// Remove Role
const removeRole = (id) => {
	const sql = `DELETE FROM roles WHERE id = ?`;
	const params = id;

	db.query(sql, params).then((res) => console.log("Role Deleted"));
};

module.exports = { viewAllRoles, addRole, removeRole };
