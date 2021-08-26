const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
	{
		host: "localhost",
		user: "root",
		password: "goodboy217",
		database: "staff_service_solutions",
	},
	console.log("Connected to staff database")
);

module.exports = db;
