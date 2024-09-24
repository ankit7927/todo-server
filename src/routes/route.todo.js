const express = require("express");
const todoController = require("../controllers/cont.todo");
const router = express.Router();

router.route("/getall").get(todoController.getAll);

router.route("/toggle/:todoId").get(todoController.toggleCompleted);

router.route("/new").post(todoController.new);

router.route("/update").put(todoController.update);

router.route("/delete/:todoId").delete(todoController.delete);

module.exports = router;
