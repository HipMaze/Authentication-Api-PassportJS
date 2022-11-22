const UserModel = require("../../model/user");

async function createUser({ username, password, token, roles }) {
	return new Promise(async (resolve, reject) => {
		const user = await UserModel.findOne({ username });

		if (user) {
			reject("Username is already in use");
		}

		resolve(
			await UserModel.create({
				username,
				password,
				token,
				roles,
			})
		);
	});
}

module.exports = createUser;
