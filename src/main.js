require("dotenv").config();
const express = require("express");
const connectDB = require("./configs/config.db");
const mongoose = require("mongoose");


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false, }));


if (process.env.NODE_ENV === "dev") {
    const morgan = require("morgan");
    app.use(morgan("dev"));
}

connectDB();

app.use("/api", require("./routes/route.api"))

app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({ message: err.message })
});

mongoose.connection.once("open", () => {
    console.log("connected to database");
    app.listen(port, () => {
        console.log(`server started on ${port}`);
    });
});

mongoose.connection.on("error", (error) => {
    console.log(error);
});
