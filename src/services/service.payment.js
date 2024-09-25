const stripe = require("stripe")(
	"sk_test_51Q2ZDoL8che3ZyWprUSJ70W8oviq1GN3Czwq79H8e8Oh8qr8TwL0RdGctsUjNaf4eV3D0fADI7gfp1expBWIWVRj00VPQkD7mP",
);
const paymentService = {};

paymentService.createSubscriptionSession = async (user) => {
	let customer;

	const existingCustomers = await stripe.customers.list({
		email: user.email,
		limit: 1,
	});

	if (existingCustomers.data.length > 0) {
		customer = existingCustomers.data[0];

		const subscriptions = await stripe.subscriptions.list({
			customer: customer.id,
			status: "active",
			limit: 1,
		});

		if (subscriptions.data.length > 0) {
			return await stripe.billingPortal.sessions.create({
				customer: customer.id,
				return_url: "http://localhost:3000",
			});
		}
	} else {
		customer = await stripe.customers.create({
			email: user.email,
			metadata: {
				userId: user._id.toString(),
			},
		});
	}

	const session = await stripe.checkout.sessions.create({
		success_url: "http://localhost:5173/login",
		cancel_url: `http://localhost:5173/sub-cancel/${user._id}`,
		payment_method_types: ["card"],
		mode: "subscription",
		billing_address_collection: "auto",
		line_items: [
			{
				price_data: {
					currency: "inr",
					product_data: {
						name: "Todo",
						description: "Get Subscription for todos",
					},
					unit_amount: 20000,
					recurring: {
						interval: "month",
					},
				},
				quantity: 1,
			},
		],
		metadata: {
			userId: user._id.toString(),
		},
		customer: customer.id,
	});

	return session;
};

paymentService.getSubscriptionDetails = async (userEmail) => {
	const existingCustomers = await stripe.customers.list({
		email: userEmail,
		limit: 1,
	});

	if (existingCustomers.data.length > 0) {
		customer = existingCustomers.data[0];

		const subscriptions = await stripe.subscriptions.list({
			customer: customer.id,
			status: "active",
			limit: 1,
		});

		if (subscriptions.data.length > 0) {
			return await stripe.billingPortal.sessions.create({
				customer: customer.id,
				return_url: "http://localhost:5173/",
			});
		} else {
			throw new Error("no subscription found");
		}
	} else {
		throw new Error("user not found");
	}
};

module.exports = paymentService;
