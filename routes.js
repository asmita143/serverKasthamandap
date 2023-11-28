const { Router } = require("express");
const { sendEmail } = require("./sendEmail");

const router = Router();

router.route("/response").post(sendEmail);

module.exports = router;
