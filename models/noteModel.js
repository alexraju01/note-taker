const { DataTypes } = require("sequelize");
const sequelize = require("../server");

const Note = sequelize.define("Note", {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	content: {
		type: DataTypes.TEXT,
		allowNull: false,
	},
	colour: {
		type: DataTypes.STRING,
		defaultValue: "#ffffff",
	},
});

module.exports = Note;
