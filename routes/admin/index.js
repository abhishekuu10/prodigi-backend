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

router.use(authCheck);
// product routes
router.post("/product", addProduct);
router.put("/product", updateProduct);
router.get("/mostwishlisted", mostWishlistedProduct);
router.get("/mostviewed", mostViewedProduct);

// role routes
router.get("/roles", getRole);
router.post("/roles", createRole);
router.put("/roles", updateRole);
router.delete("/roles", deleteRole);

// permission routes
router.get("/permissions", getPermission);
router.post("/permissions", createPermission);
router.put("/permissions", updatePermission);
router.delete("/permissions", deletePermission);

module.exports = { router };
