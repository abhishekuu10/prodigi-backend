const router = require("express").Router();
const user = require("./user").router;
const admin = require("./admin").router;

router.use("/user", user);
router.use("/admin", admin);

module.exports = { router };
