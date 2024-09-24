const { isValidObjectId } = require("mongoose")
const todoServices = require("../services/service.todo")

const apiController = {}

apiController.getAll = async (req, res) => {
    try {
        return res.json(await todoServices.getall())
    } catch (error) {
        return res.status(error.status || 500).json({"message":error})
    }
}

apiController.delete = async (req, res) => {
    const todoId = req.params.todoId;
    if (!isValidObjectId(todoId)) 
        return res.status(404).json({"message":"todo id is not valid"})
    
    try {
        await todoServices.delete(todoId)
        return res.json({"message":"deleted"})
    } catch (error) {
        return res.status(error.status || 500).json({"message":error})
    }
}


apiController.toggleCompleted = async (req, res) => {
    const todoId = req.params.todoId;
    if (!isValidObjectId(todoId)) 
        return res.status(404).json({"message":"todo id is not valid"})
    
    try {
        return res.json(await todoServices.toggleCompleted(todoId))
    } catch (error) {
        return res.status(error.status || 500).json({"message":error})
    }
}


apiController.update = async (req, res) => {
    const data = req.body;
    
    if (!isValidObjectId(data.todoId)) 
        return res.status(404).json({"message":"todo id is not valid"})

    if (!data.title)
        return res.status(404).json({"message":"title is required"})

    try {
        return res.json(await todoServices.update(data))
    } catch (error) {
        return res.status(error.status || 500).json({"message":error})
    }
}


apiController.new = async (req, res) => {
    const data = req.body;

    if (!data.title)
        return res.status(404).json({"message":"title is required"})

    try {
        return res.json(await todoServices.new(data))
    } catch (error) {
        return res.status(error.status || 500).json({"message":error})
    }
}


module.exports = apiController;