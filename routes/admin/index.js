const { Router } = require("express");
const router = Router();
const {
  addProduct,
  mostWishlistedProduct,
  updateProduct,
  mostViewedProduct,
} = require("../../controllers/admin/products/index");

const {
  getRole,
  createRole,
  updateRole,
  deleteRole,
} = require("../../controllers/admin/roles");

const {
  getPermission,
  createPermission,
  updatePermission,
  deletePermission,
} = require("../../controllers/admin/permissions");

const authCheck = require("../../middlewares/authCheck");

router.post("/product", authCheck, addProduct);
router.put("/product", authCheck, updateProduct);
router.get("/mostwishlisted", authCheck, mostWishlistedProduct);
router.get("/mostviewed", authCheck, mostViewedProduct);

router.post("/roles", createRole);
router.get("/roles", getRole);

router.post("/permissions", createPermission);
router.get("/permissions", getPermission);

module.exports = { router };
