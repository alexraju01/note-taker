// config/db.js

// 1. Import necessary modules
require("dotenv").config();
const { Sequelize } = require("sequelize");
// No longer need fs or path if relying solely on ENV variable
// const fs = require("fs");
// const path = require("path");

// Determine which URI to use
const caCertContent = process.env.AIVEN_CA_CERT;
const connectionUri = process.env.PROD_DB_URI || process.env.DB_URI;

if (!connectionUri) {
	throw new Error("Database URI is not defined. Please set PROD_DB_URI or DB_URI.");
}

// Prepare dialect options, including SSL configuration
const dialectOptions = {
	// Other options here if needed...
};

// Check if we have CA content (i.e., we are in a production/secure environment)
if (caCertContent) {
	console.log("Using Aiven CA Certificate from environment variable.");
	dialectOptions.ssl = {
		// Enforce SSL encryption
		require: true,

		// Pass the certificate content directly from the ENV variable
		ca: caCertContent,

		// Keep verification on, as the CA is now provided
		rejectUnauthorized: true,
	};
} else {
	// IMPORTANT: If running locally without the ENV variable,
	// you MUST handle SSL differently, likely by disabling it
	// or using a different local DB URI that doesn't require it.
	console.warn(
		"AIVEN_CA_CERT environment variable is missing. Running without custom CA verification."
	);
	// If your local DB requires SSL, you'll need local setup here.
	// Otherwise, a simple connection attempt will proceed.
}

// Pass the URI to Sequelize, which handles extracting host, port, user, dbname, etc.
const sequelize = new Sequelize(connectionUri, {
	dialect: "mysql",
	logging: false,
	dialectOptions: dialectOptions, // Use the dynamically created dialectOptions
});

module.exports = sequelize;
