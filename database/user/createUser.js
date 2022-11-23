const UserModel = require("../../model/user");

async function createUser({ username, password, role }) {
	return new Promise(async (resolve, reject) => {
		const user = await UserModel.findOne({ username });

		if (user) {
			reject("Username is already in use");
		} else {
			resolve(
				await UserModel.create({
					username,
					password,
					role,
				})
			);
		}
	});
}

module.exports = createUser;
