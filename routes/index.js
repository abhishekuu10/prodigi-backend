const { Router } = require("express");
const router = Router();
const user = require("./user/index").router;
const admin = require("./admin/index").router;

router.use("/user", user);
router.use("/admin", admin);

module.exports = { router };
