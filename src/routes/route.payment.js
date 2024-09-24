const express = require("express");
const paymentController = require("../controllers/cont.paymnt");
const router = express.Router();

router.route("/subscription-details/:userEmail").get(paymentController.getSubscriptionDetails);
router.route("/subscription-cancled/:userId").post(paymentController.canceledSubscription)

module.exports = router;