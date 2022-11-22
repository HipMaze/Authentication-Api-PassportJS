const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);

require("dotenv").config();
require("./database/databaseConnection").connect();

const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const router = require("./router/router");

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(passport.initialize());

app.use(
	cors({
		origin: "*",
		allowedHeaders: ["Content-Type", "Authorization", "roles"],
		preflightContinue: false,
	})
);

initialiseAuthentication(app);

app.get("/start", cors(), (req, res) => {
	res.status(200).json({ hello: "Hello, from the back-end world!" });
});

router(app);

app.get("*", (req, res) => {
	return res.status(404).json({
		success: "false",
		message: "Page not found",
		error: {
			statusCode: 404,
			message: "You reached a route that is not defined on this server",
		},
	});
});

server.listen(port, (err) => {
	if (err) throw err;
	console.log(`> Ready on localhost:${port}`);
});
