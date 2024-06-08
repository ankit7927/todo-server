const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "todo title is required"]
    },
    description: String,
    completed: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date()
    }
})

module.exports = mongoose.model("Todo", todoSchema)