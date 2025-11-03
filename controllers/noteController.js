const Note = require("../models/noteModel");
const APIFeature = require("../utility/APIFeatures");
const AppError = require("../utility/appError");

exports.getAllNotes = async (req, res) => {
	try {
		// 1. Instantiate the class with the Note model and request query
		const features = new APIFeature(Note, req.query);
		// 2. Chain the paginate method AND execute the query
		const { notes, count, limit, page } = await features.paginate().execute();
		// 3. Calculate total pages
		const totalPages = Math.ceil(count / limit);

		res.status(200).json({
			status: "success",
			results: notes.length,
			data: notes,
			totalPages: totalPages,
			currentPage: page,
		});
	} catch (err) {
		res.status(404),
			json({
				status: "fail",
				message: err.message,
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
