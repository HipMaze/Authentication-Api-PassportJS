const { UserModel } = require("../../model/user");

async function getUserById(id) {
	return await UserModel.findById(id).exec();
}

module.exports = { getUserById };
