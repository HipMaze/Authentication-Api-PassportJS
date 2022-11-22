const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
	username: { type: String, default: null },
	password: { type: String },
	token: { type: String },
	roles: { type: Number },
});

module.exports = model("User", UserSchema);
