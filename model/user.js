const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
	username: { type: String, default: null },
	password: { type: String },
	role: { type: String },
});

module.exports = model("User", UserSchema);
