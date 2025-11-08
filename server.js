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
		// Explicitly listen on '0.0.0.0' for Render/cloud deployment compatibility
		app.listen(PORT, "0.0.0.0", () => {
			console.log(` Server is running at http://0.0.0.0:${PORT}`);
		});
	} catch (error) {
		console.error(" Database connection failed:", error);
	}
};

startServer();
