const userModel = require("../models/model.user");
const jwt = require("jsonwebtoken");
const authService = {};

authService.register = async (data) => {
	await userModel.create(data);
};

authService.login = async (data) => {
	const existingUser = await userModel
		.findOne({ email: email })
		.lean()
		.exec();

	if (!existingUser) errorGen("client with email is not found", 404);

	if (existingUser.password === password) {
		return {
			token: jwt.sign({ id: existingUser._id }, "some secret"),
		};
	} else errorGen("wrong password", 404);
};

module.exports = authService;
