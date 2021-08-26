const express = require("express");
const db = require("./db/connection");
const employeeRoutes = require("./routes/employeeRoutes");
const roleRoutes = require("./routes/roleRoutes");

const PORT = process.env.PORT || 3001;
const app = express();

// Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use api routes
app.use("/api", employeeRoutes);
app.use("/api", roleRoutes);

//!  Default res for any other req (Not Found) LAST ROUTE
app.use((req, res) => {
	res.status(404).end();
});

db.connect((err) => {
	if (err) throw err;
	console.log("Database Connected.");
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
});
