const express = require("express");
const router = express.Router();
const inquirer = require("inquirer");
const cTable = require("console.table");

router.use(require("./routes/employeeRoutes"));

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
		const viewAll = () =>
			fetch("/employees", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}).then((data) => data.json());

		console.log(viewAll);
	}
	if (result === "View All Employees By Department") {
		// TODO
	}
	if (result === "View All Employees By Manager") {
		// TODO
	}
	if (result === "Add Employee") {
		// TODO
	}
	if (result === "Remove Employee") {
		// TODO
	}
	if (result === "Update Employee") {
		// TODO
	}
	if (result === "Update Employee Role") {
		// TODO
	}
	if (result === "Update Employee Manager") {
		// TODO
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
