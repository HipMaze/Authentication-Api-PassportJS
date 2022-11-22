const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const express = require("express");

require("dotenv").config();
require("./config/database").connect();

const { API_PORT, NODE_ENV } = process.env;
const dev = NODE_ENV !== "production";
const port = process.env.PORT || API_PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json({ limit: "50mb" }));

app.use(
	cors({
		origin: "*",
		allowedHeaders: ["Content-Type", "Authorization", "roles"],
		preflightContinue: false,
	})
);

app.get("/start", (req, res) => {
	res.status(200).json({ hello: "Hello, from the back-end world!" });
});

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
