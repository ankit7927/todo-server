const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

router.use("/todo", authMiddleware, require("./route.todo"));
router.use("/auth", require("./route.auth"));
router.use("/payment", require("./route.payment"));

module.exports = router;
