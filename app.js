const express = require("express");
const app = express();
const notesRouter = require("./routes/noteRoutes");

// MIDDLEWARE
app.use(express.json());

// Routes
// app.get("/", (_, res) => {
// 	res.send("Hello World!");
// });

app.use("/api/v1/notes", notesRouter);

module.exports = app;
