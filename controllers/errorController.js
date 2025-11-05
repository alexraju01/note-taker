const AppError = require("../utility/appError");

const handleSequelizeUniqueConstraintErrorDB = (err) => {
	if (err.errors && err.errors.length > 0) {
		const errorItem = err.errors[0];
		const { message } = errorItem;

		return new AppError(message, 400);
	}
};

const handleSequelizeValidationErrorDB = (err, res) => {
	if (err.errors && err.errors.length > 0) {
		const errorItem = err.errors[0];
		const { message } = errorItem;

		return new AppError(message, 400);
	}
};

const sendErrorDev = (err, res) => {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack,
	});
};

const sendErrorProd = (err, res) => {
	// These errors are operational and can be trusted: like send message to client
	if (err.isOperational) {
		res.status(err.statusCode).json({
			status: err.status,
			message: err.message,
		});
	} else {
		// 1) Log Error
		console.error("Error:", err);

		// 2) Send Generic Message
		res.status(500).json({ status: "Error", message: "Something went wrong" });
	}
};

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || "error";

	if (process.env.NODE_ENV === "development") {
		sendErrorDev(err, res);
	} else if (process.env.NODE_ENV === "production") {
		let error = { ...err };
		if (error.name === "SequelizeUniqueConstraintError") {
			error = handleSequelizeUniqueConstraintErrorDB(error);
		}
		if (error.name === "SequelizeValidationError") {
			error = handleSequelizeValidationErrorDB(error);
		}
		sendErrorProd(error, res);
	}
};
