const UserModel = require("../../model/user");

async function getUserById(id) {
	return await UserModel.findById(id).exec();
}

async function getUserByUsername(username) {
	return await UserModel.findOne({ username }).exec();
}

module.exports = { getUserById, getUserByUsername };
