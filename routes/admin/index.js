const { Router } = require("express");
const router = Router();
const {
  addProduct,
  mostWishlistedProduct,
  updateProduct,
  mostViewedProduct,
} = require("../../controllers/admin/index");

const createRole = require("../../controllers/role/createRole");
const getRole = require("../../controllers/role/getRole");

const authCheck = require("../../middlewares/authCheck");

router.post("/product", authCheck, addProduct);
router.put("/product", authCheck, updateProduct);
router.get("/mostwishlisted", authCheck, mostWishlistedProduct);
router.get("/mostviewed", authCheck, mostViewedProduct);

router.post("/roles", createRole);
router.get("/roles", getRole);

module.exports = { router };
