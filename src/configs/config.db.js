const mongoose = require("mongoose");

let db_url = "";
if (process.env.NODE_ENV === "pro")
	db_url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@todo-cluster.iiol7.mongodb.net/?retryWrites=true&w=majority&appName=todo-cluster`;
else db_url = "mongodb://127.0.0.1:27017/todo";

mongoose.set("strictQuery", false);
const connectDB = async () => {
	try {
		await mongoose.connect(db_url);
	} catch (error) {
		console.log(error);
	}
};

module.exports = connectDB;
