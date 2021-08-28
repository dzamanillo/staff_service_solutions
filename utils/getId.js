const getNameId = (name) => {
	const employeeName = name.split(" ");
	console.log("employeeName: ", employeeName);

	const sql = `SELECT employee.id, employee.first_name, employee.last_name FROM employee WHERE employee.first_name = ? AND employee.last_name = ?`;
	const params = [employeeName[0], employeeName[1]];

	db.query(sql, params).then((res) => {
		console.log("res[0].id: ", res[0].id);
		return res[0].id;
	});
};

const value = getNameId("Mike Chan");

console.log("value: ", value);
