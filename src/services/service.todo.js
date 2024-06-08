const todoModel = require("../models/models.todo");

todoServices = {}

todoServices.new = async (data) => {
    const newTodo = await todoModel.create(data)
    return newTodo;
}

todoServices.update = async (data) => {
    const updated = await todoModel.findByIdAndUpdate({ _id: data.todoId },
        {
            "$set": {
                title: data.title,
                description: data.description,
            }
        }, { new: true })
    return updated;
}

todoServices.toggleCompleted = async (todoId) => {
    const updated = await todoModel.findByIdAndUpdate({ _id: todoId },
        {
            "$set": {
                completed: true
            }
        }, { new: true })
    return updated;
}

todoServices.delete = async (todoId) => {
    await todoModel.findByIdAndDelete({ _id: todoId })
}

todoServices.getall = async () => {
    return await todoModel.find()
}

module.exports = todoServices;