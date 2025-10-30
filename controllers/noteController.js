const Note = require("../models/noteModel");
const AppError = require("../uilts/appError");

exports.getAllNotes = async (_, res) => {
	try {
		const notes = await Note.findAll();
		res.status(200).json({ status: "success", results: notes.length, data: notes });
	} catch (err) {
		res.status(404),
			json({
				status: "fail",
				message: `${err} kjdhfksjdfh`,
			});
	}
};

exports.getOne = async (req, res) => {
	const { id } = req.params;
	const note = await Note.findByPk(id);

	res.status(200).json({ status: "success", data: note });
};

exports.updateNote = async (req, res) => {
	const { id } = req.params;
	const { title, content } = req.body;

	const note = await Note.findByPk(id);

	if (!note) {
		return res.status(404).json({ message: "Note not found" });
	}

	const updatedNote = await note.update({ title, content });

	res.status(200).json({
		message: "Note updated successfully",
		note: updatedNote,
	});
};

exports.deleteNote = async (req, res, next) => {
	const { id } = req.params;

	const deletedNote = await Note.destroy({ where: { id } });
	if (!deletedNote) return next(new AppError(`No Note found with the id: ${id}`, 404));

	res.status(204).json({
		status: "success",
		data: null,
	});
};
