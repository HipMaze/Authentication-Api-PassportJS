const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../../model/user");

const setup = () => {
	passport.serializeUser((user, done) => done(null, user._id));

	passport.deserializeUser(async (id, done) => {
		try {
			const user = await UserModel.findById(id);
			return done(null, user);
		} catch (err) {
			return done(err, null);
		}
	});
};

const signToken = (user) => {
	return jwt.sign({ data: user }, process.env.JWT_SECRET, {
		expiresIn: 604800,
	});
};

const hashPassword = async (password) => {
	if (!password) {
		throw new Error("Password was not provided");
	}

	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

const verifyPassword = async (candidate, actual) => {
	return await bcrypt.compare(candidate, actual);
};

const checkIsInRole =
	(...roles) =>
	(req, res, next) => {
		if (!req.user) {
			return res.status(401).json({
				success: false,
				data: "No User !",
			});
		}

		const hasRole = roles.find((role) => req.user.role === role);
		if (!hasRole) {
			return res.status(403).json({
				success: false,
				data: "Not the correct role !",
			});
		}

		return next();
	};

module.exports = {
	setup,
	signToken,
	hashPassword,
	verifyPassword,
	checkIsInRole,
};
