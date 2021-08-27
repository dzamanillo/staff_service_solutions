const inquirer = require("inquirer");
const {
	viewAllEmployees,
	viewAllEmployeesByDepartment,
	addEmployee,
	removeEmployee,
	updateEmployee,
	updateEmployeeRole,
	updateEmployeeManager,
	viewAllEmployeesByManager,
} = require("./routes/employeeRoutes");
const db = require("./db/connection");

// Arrays

const nameArr = [];
const sqlName = `SELECT CONCAT(employee.first_name, " ", employee.last_name) AS name FROM employee`;
db.query(sqlName).then((res) => {
	const roughArr = res;
	roughArr.forEach((i) => {
		nameArr.push(i.name);
	});
});

const departmentArr = [];
const sqlDepartment = `SELECT department.department_name FROM department`;
db.query(sqlDepartment).then((res) => {
	const roughArr = res;

	roughArr.forEach((i) => {
		departmentArr.push(i.department_name);
	});
});

const roleArr = [];
const sqlRole = `SELECT roles.title FROM roles`;
db.query(sqlRole).then((res) => {
	res.forEach((i) => {
		roleArr.push(i.title);
	});
});

// Functions
const getNameId = (name) => {
	const employeeName = name.split(" ");

	const sql = `SELECT employee.id, employee.first_name, employee.last_name FROM employee WHERE employee.first_name = ? AND employee.last_name = ?`;
	const params = [employeeName[0], employeeName[1]];

	db.query(sql, params).then((res) => {
		return res[0].id;
	});
};

// Inquire
const initQuestion = () => {
	return inquirer.prompt([
		{
			type: "list",
			name: "initQuestion",
			message: "What would you like to do?",
			choices: [
				"View All Employees",
				"View All Employees By Department",
				"View All Employees By Manager",
				"Add Employee",
				"Remove Employee",
				"Update Employee",
				"Update Employee Role",
				"Update Employee Manager",
				"View All Roles",
				"Add Role",
				"Remove Role",
				"Quit",
			],
		},
	]);
};

initQuestion().then((data) => {
	const result = data.initQuestion;

	if (result === "View All Employees") {
		viewAllEmployees().then(initQuestion);
	}
	if (result === "View All Employees By Department") {
		inquirer
			.prompt({
				type: "list",
				name: "departments",
				message: "Which department would you like to see?",
				choices: departmentArr,
			})
			.then((res) => {
				viewAllEmployeesByDepartment(res.departments);
			})
			.then(initQuestion);
	}
	if (result === "View All Employees By Manager") {
		viewAllEmployeesByManager(1);
	}
	if (result === "Add Employee") {
		inquirer
			.prompt([
				{
					type: "text",
					name: "newEmployeeFirst",
					message: "First Name?",
				},
				{
					type: "text",
					name: "newEmployeeLast",
					message: "Last Name?",
				},
				{
					type: "list",
					name: "newEmployeeRole",
					message: "Role",
					choices: roleArr,
				},
				{
					type: "list",
					name: "newEmployeeManager",
					message: "Manager Name?",
					choices: nameArr,
				},
			])
			.then((res) =>
				addEmployee(
					res.newEmployeeFirst,
					res.newEmployeeLast,
					res.newEmployeeRole,
					res.newEmployeeManager
				)
			)
			.then(viewAllEmployees)
			.then(initQuestion);
	}
	if (result === "Remove Employee") {
		inquirer
			.prompt({
				type: "list",
				name: "deleteTarget",
				message: "Which Employee Would You Like To Remove?",
				choices: nameArr,
			})
			.then((res) => {
				const targetId = getNameId(JSON.stringify(res.deleteTarget));

				removeEmployee(targetId);
			})
			.then(viewAllEmployees)
			.then(initQuestion);
	}
	if (result === "Update Employee") {
		inquirer
			.prompt([
				{
					type: "list",
					name: "updateTarget",
					message: "Which Employee Would You Like To Update?",
					choices: nameArr,
				},
				{
					type: "text",
					name: "first",
					message: "First Name",
				},
				{
					type: "text",
					name: "last",
					message: "Last Name",
				},
			])
			.then((res) => {
				updateEmployee(res.updateTarget, res.first, res.last);
			})
			.then(viewAllEmployees)
			.then(initQuestion);
	}
	if (result === "Update Employee Role") {
		inquirer
			.prompt([
				{
					type: "list",
					name: "updateTarget",
					message: "Which Employee Would You Like To Update?",
					choices: nameArr,
				},
				{
					type: "list",
					name: "newRole",
					message: "New Role",
					choices: roleArr,
				},
			])
			.then((res) => {
				updateEmployeeRole(res.updateTarget, res.newRole);
			})
			.then(viewAllEmployees)
			.then(initQuestion);
	}
	if (result === "Update Employee Manager") {
		inquirer
			.prompt([
				{
					type: "list",
					name: "updateTarget",
					message: "Which Employee Would You Like To Update?",
					choices: nameArr,
				},
				{
					type: "list",
					name: "newManager",
					message: "New Manager",
					choices: nameArr,
				},
			])
			.then((res) => {
				updateEmployeeManager(res.updateTarget, res.newManager);
			})
			.then(viewAllEmployees)
			.then(initQuestion);
	}
	if (result === "View All Roles") {
		// TODO
	}
	if (result === "Add Role") {
		// TODO
	}
	if (result === "Remove Role") {
		// TODO
	}
	if (result === "Quit") {
		console.log("Thank you. Have a great day.");
	}
});
