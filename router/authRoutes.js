const express = require("express");
const to = require("await-to-js");
const { verifyPassword, hashPassword } = require("../service/auth/utils");
const login = require("../service/auth/strategies/jwtStrategy");
const { getUserByEmail, createUser } = require("../database/user/userDB");

const router = express.Router();

router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	const [err, user] = await to(getUserByEmail(username));

	const authenticationError = () => {
		return res
			.status(500)
			.json({ success: false, data: "Authentication error!" });
	};

	if (!(await verifyPassword(password, user.password))) {
		console.error("Passwords do not match");
		return authenticationError();
	}

	const [loginErr, token] = await to(login(req, user));

	if (loginErr) {
		console.error("Log in error", loginErr);
		return authenticationError();
	}

	return res
		.status(200)
		.cookie("jwt", token, {
			httpOnly: true,
		})
		.json({
			success: true,
			data: "/",
		});
});

router.post("/register", async (req, res) => {
	const { username, password } = req.body;

	if (!/\b\w+\@\w+\.\w+(?:\.\w+)?\b/.test(username)) {
		return res
			.status(500)
			.json({ success: false, data: "Enter a valid Username." });
	} else if (password.length < 5 || password.length > 20) {
		return res.status(500).json({
			success: false,
			data: "Password must be between 5 and 20 characters.",
		});
	}

	let [err, user] = await to(
		createUser({
			username,
			password: await hashPassword(password),
		})
	);

	if (err) {
		return res
			.status(500)
			.json({ success: false, data: "Username is already taken" });
	}

	const [loginErr, token] = await to(login(req, user));

	if (loginErr) {
		console.error(loginErr);
		return res
			.status(500)
			.json({ success: false, data: "Authentication error!" });
	}

	return res
		.status(200)
		.cookie("jwt", token, {
			httpOnly: true,
		})
		.json({
			success: true,
			data: "/",
		});
});

module.exports = router;
