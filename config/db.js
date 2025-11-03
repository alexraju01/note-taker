// config/db.js
require("dotenv").config();
const { Sequelize } = require("sequelize");
// Determine which URI to use
const connectionUri = process.env.PROD_DB_URI || process.env.DB_URI;

if (!connectionUri) {
	throw new Error("Database URI is not defined. Please set PROD_DB_URI or DB_URI.");
}

// Pass the URI to Sequelize, which handles extracting host, port, user, dbname, etc.
const sequelize = new Sequelize(connectionUri, {
	dialect: "mysql",

	logging: false,

	dialectOptions: {
		ssl: {
			rejectUnauthorized: false,
		},
	},
});
module.exports = sequelize;
