// config/db.js
require("dotenv").config();
const { Sequelize } = require("sequelize");
console.log(process.env.DB_URI);
console.log("======================");
const sequelize = new Sequelize(process.env.DB_URI, {
	dialect: "mysql",
	// database: process.env.DB_NAME,
	// username: process.env.DB_USERNAME,
	// password: process.env.DB_PASSWORD,
	// host: process.env.DB_HOST,
	// port: process.env.DB_PORT,
	logging: false, // optional

	dialectOptions: {
		// Aiven requires SSL, and it's essential for remote connections
		ssl: {
			// Setting 'ssl' to true or an empty object is usually enough
			// to enable the driver to use SSL/TLS when connecting.
			// If you encounter certificate errors, you might need to set
			// rejectUnauthorized to false or provide the CA certificate file.
			rejectUnauthorized: false, // Recommended: Verify the certificate chain
		},
		// IMPORTANT: Tell the MySQL driver to use the required SSL mode
		// sslMode: "REQUIRED",
	},
});

module.exports = sequelize;
