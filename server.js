require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/db");

const startServer = async () => {
	try {
		await sequelize.authenticate();
		console.log("Database connected successfully.");

		// Sync models (optional)
		await sequelize.sync();
		console.log("Models synchronized.");

		const { PORT } = process.env;
		app.listen(PORT, () => {
			console.log(` Server is running at http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error(" Database connection failed:", error);
	}
};

startServer();
