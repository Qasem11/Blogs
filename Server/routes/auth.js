const router = require("express").Router();
const controlAuth = require("../controller/auth");

router.post("/sign-up", controlAuth.sign_up);

router.post("/sign-in", controlAuth.sign_in);

router.post("/sign-out", controlAuth.sign_out);

module.exports = router;
