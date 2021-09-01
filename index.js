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
const { viewAllRoles, addRole, removeRole } = require("./routes/roleRoutes");
const {
	viewAllDepartments,
	addDepartment,
	removeDepartment,
	departmentBudget,
} = require("./routes/departmentRoutes");
const db = require("./db/connection");

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
				"View All Departments",
				"View Department Budget",
				"Add Department",
				"Remove Department",
				"View All Roles",
				"Add Role",
				"Remove Role",
				"Quit",
			],
		},
	]);
};
const questions = async () => {
	// Departments
	const dep = await db.query(`SELECT * FROM department`);
	const depArr = dep.map(({ id, department_name }) => ({
		name: department_name,
		value: id,
	}));

	// Employees
	const employeeName = await db.query(
		`SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name) AS name FROM employee ORDER BY id`
	);
	const empArr = employeeName.map(({ id, name }) => ({
		name: name,
		value: id,
	}));

	// Managers
	const managerArr = empArr.concat({ name: "None", value: null });

	// Roles
	const role = await db.query(`SELECT * FROM roles`);
	const roleArr = role.map(({ id, title }) => ({
		name: title,
		value: id,
	}));

	initQuestion().then((data) => {
		const result = data.initQuestion;

		if (result === "View All Employees") {
			questions();
			console.log("\n \n \n");
			viewAllEmployees();
		}
		if (result === "View All Employees By Department") {
			async function viewByDepartment() {
				const response = await inquirer.prompt({
					type: "list",
					name: "departments",
					message: "Which department would you like to see?",
					choices: depArr,
				});
				viewAllEmployeesByDepartment(response.departments);
			}
			async function loop() {
				await viewByDepartment();
				console.log("\n \n \n");
				await questions();
				console.log("\n \n \n");
			}
			loop();
		}
		if (result === "View All Employees By Manager") {
			async function viewManager() {
				const response = await inquirer.prompt({
					type: "list",
					name: "manager",
					message: "Which managers employees would you like to see?",
					choices: empArr,
				});

				viewAllEmployeesByManager(response.manager);
			}
			async function loop() {
				await viewManager();
				console.log("\n \n \n");
				await questions();
				console.log("\n \n \n");
			}
			loop();
		}
		if (result === "Add Employee") {
			async function add() {
				const response = await inquirer.prompt([
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
						choices: managerArr,
					},
				]);
				console.log("response: ", response);

				addEmployee(
					response.newEmployeeFirst,
					response.newEmployeeLast,
					response.newEmployeeRole,
					response.newEmployeeManager
				);
			}
			async function loop() {
				await add();
				console.log("\n \n \n");
				await questions();
				console.log("\n \n \n");
			}
			loop();
		}
		if (result === "Remove Employee") {
			async function remove() {
				const response = await inquirer.prompt({
					type: "list",
					name: "deleteTarget",
					message: "Which Employee Would You Like To Remove?",
					choices: empArr,
				});

				removeEmployee(response.deleteTarget);
			}
			async function loop() {
				await remove();
				console.log("\n \n \n");
				await questions();
				console.log("\n \n \n");
			}
			loop();
		}
		if (result === "Update Employee") {
			async function update() {
				const response = await inquirer.prompt([
					{
						type: "list",
						name: "updateTarget",
						message: "Which Employee Would You Like To Update?",
						choices: empArr,
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
				]);

				updateEmployee(response.updateTarget, response.first, response.last);
			}
			async function loop() {
				await update();
				console.log("\n \n \n");
				await questions();
				console.log("\n \n \n");
			}
			loop();
		}
		if (result === "Update Employee Role") {
			async function roleUpdate() {
				const response = await inquirer.prompt([
					{
						type: "list",
						name: "updateTarget",
						message: "Which Employee Would You Like To Update?",
						choices: empArr,
					},
					{
						type: "list",
						name: "newRole",
						message: "New Role",
						choices: roleArr,
					},
				]);

				updateEmployeeRole(response.updateTarget, response.newRole);
			}
			async function loop() {
				await roleUpdate();
				console.log("\n \n \n");
				await questions();
				console.log("\n \n \n");
			}
			loop();
		}
		if (result === "Update Employee Manager") {
			async function updateManager() {
				const response = await inquirer.prompt([
					{
						type: "list",
						name: "updateTarget",
						message: "Which Employee Would You Like To Update?",
						choices: empArr,
					},
					{
						type: "list",
						name: "newManager",
						message: "New Manager",
						choices: managerArr,
					},
				]);

				updateEmployeeManager(response.updateTarget, response.newManager);
			}
			async function loop() {
				await updateManager();
				console.log("\n \n \n");
				await questions();
				console.log("\n \n \n");
			}
			loop();
		}
		if (result === "View All Roles") {
			async function loop() {
				await viewAllRoles();
				console.log("\n \n \n");
				await questions();
				console.log("\n \n \n");
			}
			loop();
		}
		if (result === "Add Role") {
			async function role() {
				const response = await inquirer.prompt([
					{
						type: "text",
						name: "roleName",
						message: "Role Name?",
					},
					{
						type: "text",
						name: "roleSalary",
						message: "Role Salary?",
					},
					{
						type: "list",
						name: "roleDepartment",
						message: "Role Department?",
						choices: depArr,
					},
				]);

				addRole(
					response.roleName,
					response.roleSalary,
					response.roleDepartment
				);
			}
			async function loop() {
				await role();
				console.log("\n \n \n");
				await questions();
				console.log("\n \n \n");
			}
			loop();
		}
		if (result === "Remove Role") {
			async function roleRemove() {
				const response = await inquirer.prompt({
					type: "list",
					name: "deleteTarget",
					message: "Which role Would You Like To Remove?",
					choices: roleArr,
				});

				removeRole(response.deleteTarget);
			}
			async function loop() {
				await roleRemove();
				console.log("\n \n \n");
				await questions();
				console.log("\n \n \n");
			}
			loop();
		}
		if (result === "View All Departments") {
			async function loop() {
				await viewAllDepartments();
				console.log("\n \n \n");
				await questions();
				console.log("\n \n \n");
			}
			loop();
		}
		if (result === "Add Department") {
			async function newDep() {
				const response = await inquirer.prompt([
					{
						type: "text",
						name: "newDep",
						message: "Department Name?",
					},
				]);

				addDepartment(response.newDep);
			}
			async function loop() {
				await newDep();
				console.log("\n \n \n");
				await questions();
				console.log("\n \n \n");
			}
			loop();
		}
		if (result === "Remove Department") {
			async function departmentRemove() {
				const response = await inquirer.prompt({
					type: "list",
					name: "deleteTarget",
					message: "Which Department Would You Like To Remove?",
					choices: depArr,
				});

				removeDepartment(response.deleteTarget);
			}
			async function loop() {
				await departmentRemove();
				console.log("\n \n \n");
				await questions();
				console.log("\n \n \n");
			}
			loop();
		}
		if (result === "View Department Budget") {
			async function budget() {
				const response = await inquirer.prompt([
					{
						type: "list",
						name: "department",
						message: "Select Department",
						choices: depArr,
					},
				]);

				departmentBudget(response.department);
			}
			async function loop() {
				await budget();
				console.log("\n \n \n");
				await questions();
				console.log("\n \n \n");
			}
			loop();
		}
		if (result === "Quit") {
			console.log("Thank you. Have a great day.");
			process.exit();
		}
	});
};

questions();
