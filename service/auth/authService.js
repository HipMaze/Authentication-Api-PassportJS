const utils = require("./utils");
const strategies = require("./strategies/index");

const pipe =
	(...functions) =>
	(args) =>
		functions.reduce((arg, fn) => fn(arg), args);

const initialiseAuthentication = (app) => {
	utils.setup();

	pipe(strategies.JWTStrategy.strategy)(app);
};

module.exports = { utils, initialiseAuthentication, strategies };
