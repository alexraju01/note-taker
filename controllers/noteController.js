const Note = require("../models/noteModel");

exports.getAllNotes = async (_, res) => {
	const notes = await Note.findAll();
	res.status(200).json({ status: "success", results: notes.length, data: notes });
};
