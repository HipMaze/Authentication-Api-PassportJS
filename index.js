//servver variables
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);

//database and environement config
require("dotenv").config();
require("./database/databaseConnection").connect();

//middlewares and services imports
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const router = require("./router/router");
const authService = require("./service/auth/authService");
const express_session = require("express-session");

//global variables
const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT || 3000;
const ROLES = require("./utils/roles");
const utils = require("./service/auth/utils");

//express middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
	express_session({
		secret: "this is a random string",
		resave: false,
		saveUninitialized: true,
		cookie: {
			secret: "this is a random string",
			httpOnly: false,
			secure: true,
			maxAge: 3600000,
			sameSite: "none",
			path: "/",
		},
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
	cors({
		origin: "http://localhost:4200",
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		preflightContinue: false,
		credentials: true,
	})
);

//authService
authService.initialiseAuthentication(app);

app.get("/start", cors(), (req, res) => {
	res.status(200).json({ hello: "Hello, from the back-end world!" });
});

//app utilities router
router(app);

app.get(
	"/testRoute",
	passport.authenticate("jwt", { failureMessage: "this is fucked" }),
	utils.checkIsInRole(ROLES.Admin, ROLES.User),
	(req, res) => {
		return res.status(200).json({
			success: true,
			data: "this is indeed auth guarded",
		});
	}
);

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

//
server.listen(port, (err) => {
	if (err) throw err;
	console.log(`> Ready on localhost:${port}`);
});
