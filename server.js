const express = require("express");
const db = require("./db/connection");
const employeeRoutes = require("./routes/employeeRoutes");

const PORT = process.env.PORT || 3001;
const app = express();

// Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use api routes
app.use("/", employeeRoutes);

db.connect((err) => {
	if (err) throw err;
	console.log("Database Connected.");
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
});
