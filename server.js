require("dotenv").config();
const { Sequelize } = require("sequelize");

const app = require("./app");

const sequelize = new Sequelize({
	dialect: "mysql",
	database: process.env.DB_NAME,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
});

const initializeDatabase = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};

initializeDatabase();

const { port } = process.env;
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

module.exports = sequelize;
