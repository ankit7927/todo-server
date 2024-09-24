const { isValidObjectId } = require("mongoose");
const paymentService = require("../services/service.payment");
const authService = require("../services/service.auth");

const paymentController = {};

paymentController.getSubscriptionDetails = async (req, res, next) => {
	const userEmail = req.params.userEmail;
	if (!userEmail)
		return res.status(404).json({ message: "user email is required" });

	try {
		return res.json(await paymentService.getSubscriptionDetails(userEmail));
	} catch (error) {
		console.log(error);

		return res.status(error.status || 500).json({ message: error });
	}
};

paymentController.canceledSubscription = async (req, res, next) => {
	const userId = req.params.userId;
	if (!isValidObjectId(userId))
		return res.status(404).json({ message: "user id is not valid" });

	try {
		await authService.deleteUser(userId);
		return res.redirect("http://localhost:5173/register");
	} catch (error) {
		return res
			.status(error.status || 500)
			.json({ message: error.toString() });
	}
};

module.exports = paymentController;
