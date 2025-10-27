const express = require("express");
const app = express();

// MIDDLEWARE
app.use(express.json());

app.get("/", (_, res) => {
	res.send("Hello World!");
});

module.exports = app;
