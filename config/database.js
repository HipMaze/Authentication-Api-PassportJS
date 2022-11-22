const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
	// Connecting to the database
	mongoose
		.connect(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("Successfully Connected to the Database");
		})
		.catch((error) => {
			console.log("Database Connection Failed. exiting now...");
			console.error(error);
			process.exit(1);
		});
};
