const express = require("express");
const app = express();
const notesRouter = require("./routes/noteRoutes");

// MIDDLEWARE
app.use(express.json());

app.use("/api/v1/notes", notesRouter);

module.exports = app;
