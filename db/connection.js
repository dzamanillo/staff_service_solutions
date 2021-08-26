const mysql = require("mysql2");
const util = require("util");
require("dotenv").config();

// Connect to database
const db = mysql.createConnection(
	{
		host: "localhost",
		user: "root",
		password: process.env.MY_PASS,
		database: process.env.DB_NAME,
	},
	console.log("Connected to staff database")
);
db.query = util.promisify(db.query);

module.exports = db;
