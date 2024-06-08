const express = require("express");
const apiController = require("../controllers/cont.api");
const router = express.Router()

router.route("/getall")
    .get(apiController.getAll);

router.route("/toggle/:todoId")
    .get(apiController.toggleCompleted);

router.route("/new")
    .post(apiController.new);

router.route("/update")
    .put(apiController.update)

router.route("/delete/:todoId")
    .delete(apiController.delete)


module.exports = router;