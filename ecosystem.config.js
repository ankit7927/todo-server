module.exports = {
	apps: [
		{
			name: "todo server",
			script: "src/main.js",
			env: {
				NODE_ENV: process.env.NODE_ENV,
				STRIPE_SECRETE: process.env.STRIPE_SECRETE,
				DB_USERNAME: process.env.DB_USERNAME,
				DB_PASSWORD: process.env.DB_PASSWORD,
			},
		},
	],
};
