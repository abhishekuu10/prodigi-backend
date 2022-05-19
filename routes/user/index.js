const { Router } = require("express");
const router = Router();
const authCheck = require("../../middlewares/authCheck");

// const { getViews, getWishList } = require("../controllers/admin/track");

const { login } = require("../../controllers/auth/userLogin");
const { signUp } = require("../../controllers/auth/userSignUp");

const {
  getProducts,
  searchProducts,
  wishlist,
} = require("../../controllers/user");

router.get("/products", getProducts);
router.get("/searchproducts/", searchProducts); //

router.post("/signup", signUp);
router.post("/login", login);

router.post("/products/wishlist", authCheck, wishlist.addToWishList);
router.get("/products/wishlist", authCheck, wishlist.getWishList);
router.delete("/products/wishlist", authCheck, wishlist.deletewishlist);

module.exports = { router };
