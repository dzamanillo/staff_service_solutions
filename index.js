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
//* GET NAME
async function getNameId(name) {
	const employeeName = await name.split(" ");
	const sql =
		await `SELECT employee.id, employee.first_name, employee.last_name FROM employee WHERE employee.first_name = ? AND employee.last_name = ?`;
	const params = await [employeeName[0], employeeName[1]];
	const request = await db.query(sql, params);
	const value = await request[0].id;
	return value;
}

//* GET ROLE
async function getRoleId(role) {
	const sql =
		await `Select roles.id, roles.title FROM roles WHERE roles.title = ?`;
	const params = await role;

	const request = await db.query(sql, params);

	const value = await request[0].id;
	return value;
}

//* GET Department
async function getDepartmentId(department) {
	const sql =
		await `Select department.id, department.department_name FROM department WHERE department.department_name = ?`;
	const params = await department;

	const request = await db.query(sql, params);

	const value = await request[0].id;
	return value;
}

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
const questions = () => {
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
					choices: departmentArr,
				});

				const depVal = await getDepartmentId(response.departments);
				console.log("depVal: ", depVal);

				viewAllEmployeesByDepartment(depVal);
			}
			async function loop() {
				await viewByDepartment();
				console.log("\n \n \n");
				await questions();
				console.log("\n \n \n");
			}
			loop();
		}
		//TODO
		if (result === "View All Employees By Manager") {
			viewAllEmployeesByManager(1);
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
						choices: nameArr,
					},
				]);
				console.log("response: ", response);

				const roleVal = await getRoleId(response.newEmployeeRole);
				console.log("roleVal: ", roleVal);

				const nameVal = await getNameId(response.newEmployeeManager);
				console.log("nameVal: ", nameVal);

				addEmployee(
					response.newEmployeeFirst,
					response.newEmployeeLast,
					roleVal,
					nameVal
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
					choices: nameArr,
				});
				console.log("response: ", response);

				const value = await response.deleteTarget;
				console.log("value: ", value);

				const nameId = await getNameId(value);
				console.log("nameId: ", nameId);

				removeEmployee(nameId);
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
				]);

				const nameID = await getNameId(response.updateTarget);

				updateEmployee(nameID, response.first, response.last);
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
						choices: nameArr,
					},
					{
						type: "list",
						name: "newRole",
						message: "New Role",
						choices: roleArr,
					},
				]);

				const name = await getNameId(response.updateTarget);
				const role = await getRoleId(response.newRole);
				updateEmployeeRole(name, role);
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
						choices: nameArr,
					},
					{
						type: "list",
						name: "newManager",
						message: "New Manager",
						choices: nameArr,
					},
				]);

				const target = await getNameId(response.updateTarget);
				const manager = await getNameId(response.newManager);

				updateEmployeeManager(target, manager);
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
						choices: departmentArr,
					},
				]);

				const dep = await getDepartmentId(response.roleDepartment);
				addRole(response.roleName, response.roleSalary, dep);
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

				const role = await getRoleId(response.deleteTarget);
				removeRole(role);
			}
			async function loop() {
				await roleRemove();
				console.log("\n \n \n");
				await questions();
				console.log("\n \n \n");
			}
			loop();
		}
		if (result === "Quit") {
			console.log("Thank you. Have a great day.");
		}
	});
};

questions();
