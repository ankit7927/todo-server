const userModel = require("../models/model.user");
const jwt = require("jsonwebtoken");
const { errorGen } = require("../utilities/util.common");
const paymentService = require("./service.payment");
const authService = {};

authService.register = async (data) => {
	const newUser = await userModel.create(data);
	console.log(newUser);

	return await paymentService.createSubscriptionSession(newUser);
};

authService.login = async (data) => {
	const existingUser = await userModel
		.findOne({ email: data.email })
		.lean()
		.exec();

	if (!existingUser) errorGen("client with email is not found", 404);

	if (existingUser.password == data.password) {
		return {
			token: jwt.sign({ id: existingUser._id }, "some secret"),
			userId: existingUser._id,
			userEmail: existingUser.email,
		};
	} else errorGen("wrong password", 404);
};

authService.deleteUser = async (userId) => {
	const deleted = await userModel.findByIdAndDelete({ _id: userId });
	return deleted;
};

module.exports = authService;
