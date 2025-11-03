const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Note = sequelize.define("Note", {
	title: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true,
		validate: {
			notEmpty: {
				msg: "Title is required and cannot be empty",
			},
			len: {
				args: [3, 100],
				msg: "Title must be between 3 and 100 characters long.",
			},
			maxCharacter(value) {
				if (value.length > 5000) {
					throw new Error("Content cannot exceed 5000 characters.");
				}
			},
		},
	},
	content: {
		type: DataTypes.TEXT,
		allowNull: false,
		notEmpty: {
			msg: "Content is required and cannot be empty.",
		},
	},
	colour: {
		type: DataTypes.STRING,
		defaultValue: "#ffffff",
	},
	status: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
		allowNull: false,
	},
});

module.exports = Note;
