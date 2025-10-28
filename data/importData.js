const fs = require("fs");
const path = require("path");
require("dotenv").config();

const sequelize = require("../config/db");
const Note = require("../models/noteModel");

const notes = JSON.parse(fs.readFileSync(path.join(__dirname, "note.json"), "utf-8"));

// node data/importData.js --import
const importData = async () => {
	try {
		await sequelize.sync({ force: true });
		await Note.bulkCreate(notes);
		console.log("Data successfully imported");
		process.exit();
	} catch (error) {
		console.error("Import dailed:", error);
		process.exit(1);
	}
};
// node data/importData.js --delete
const deleteData = async () => {
	try {
		await Note.destroy({ where: {} });
		console.log("All notes deleted!");
		process.exit();
	} catch (error) {
		console.error("Deletetion failed:", error);
		process.exit(1);
	}
};

if (process.argv[2] === "--import") {
	importData();
} else if (process.argv[2] === "--delete") {
	deleteData();
} else {
	console.log("Please specify --import");
	process.exit();
}
