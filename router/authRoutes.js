const express = require("express");
const { to } = require("await-to-js");
const { verifyPassword, hashPassword } = require("../auth/utils");
const { login } = require("../auth/strategies/jwt");
const { createUser, getUserByEmail } = require("../config/user/getter");

const router = express.Router();

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const [err, user] = await to(getUserByEmail(email));

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
	const { firstName, lastName, email, password } = req.body;

	if (!/\b\w+\@\w+\.\w+(?:\.\w+)?\b/.test(email)) {
		return res
			.status(500)
			.json({ success: false, data: "Enter a valid email address." });
	} else if (password.length < 5 || password.length > 20) {
		return res.status(500).json({
			success: false,
			data: "Password must be between 5 and 20 characters.",
		});
	}

	let [err, user] = await to(
		createUser({
			firstName,
			lastName,
			email,
			password: await hashPassword(password),
		})
	);

	if (err) {
		return res
			.status(500)
			.json({ success: false, data: "Email is already taken" });
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
