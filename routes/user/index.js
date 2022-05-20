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

// user general routes
router.get("/products", getProducts);
router.get("/searchproducts/", searchProducts); //

router.post("/signup", signUp);
router.post("/login", login);

// user authenticated routes
router.use(authCheck);

router.post("/products/wishlist", wishlist.addToWishList);
router.get("/products/wishlist", wishlist.getWishList);
router.delete("/products/wishlist", wishlist.deletewishlist);

module.exports = { router };
