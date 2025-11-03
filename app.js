const express = require("express");
const app = express();
const favicon = require("serve-favicon");
const path = require("path");
const notesRouter = require("./routes/noteRoutes");
const morgan = require("morgan");
const AppError = require("./utility/appError");
const globalErrorHandler = require("./controllers/errorController");
const cors = require("cors");

// MIDDLEWARE
app.use(express.json());

app.use(cors());
app.use(favicon(path.join(__dirname, "public/images", "favicon.ico")));
app.use(express.static("public"));

// Development Logging
if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use("/api/v1/notes", notesRouter);

// Catches all undefined routes
app.get("/*splat", async (req, res, next) => {
	next(new AppError(`can't find the ${req.originalUrl} on the this server`));
});

app.use(globalErrorHandler);

module.exports = app;
