const userModel = require("../models/model.user");
const jwt = require("jsonwebtoken");
const paymentService = require("./service.payment");
const authService = {};

authService.register = async (data) => {
	const newUser = await userModel.create(data);
	return await paymentService.createSubscriptionSession(newUser);
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

authService.deleteUser = async (userId) => {
	const deleted = await userModel.findByIdAndDelete({ _id: userId });
	return deleted;
};

module.exports = authService;
