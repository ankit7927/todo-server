const authService = require("../services/service.auth");

const userController = {}

userController.login = async (req, res, next)=> {
    const x = {email, password} = req.body;
    try {
        return res.json(await authService.login(x))
    } catch (error) {
        return res.status(error.status || 500).json({"message":error})
    }
}

userController.register = async (req, res, next)=> {
    const x = {name, email, password} = req.body;
    try {
        return res.json(await authService.register(x))
    } catch (error) {
        console.log(error);
        
        return res.status(error.status || 500).json({"message":error})
    }
}


module.exports = userController;