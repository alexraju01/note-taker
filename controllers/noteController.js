const Note = require("../models/noteModel");
const APIFeature = require("../utility/APIFeatures");
const AppError = require("../utility/appError");
const catchAsync = require("../utility/catchAsync");

exports.getAllNotes = catchAsync(async (_, res) => {
	const notes = await Note.findAll();

	res.status(200).json({
		status: "success",
		results: notes.length,
		data: notes,
	});
});

exports.getOne = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	// 1. Check if the ID is a valid format (e.g., a number)
	if (!id || Number.isNaN(Number(id))) {
		return next(new AppError("Invalid Note ID format. ID must be a number.", 400));
	}
	const note = await Note.findByPk(id);
	if (!note) return next(new AppError("No Note found with that id", 404));

	res.status(200).json({ status: "success", data: note });
});

exports.updateNote = async (req, res) => {
	const { id } = req.params;
	const { title, content } = req.body;

	const note = await Note.findByPk(id);

	if (!note) return next(new AppError("No Note found with that id", 404));

	const updatedNote = await note.update({ title, content });

	res.status(200).json({
		message: "Note updated successfully",
		note: updatedNote,
	});
};

exports.createNote = async (req, res) => {
	const note = await Note.create(req.body);

	res.status(201).json({ data: note });
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
