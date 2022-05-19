const db = require("../../models");
const WishlistProduct = db.WishlistProduct;

const mostWishlistedProduct = async (req, res) => {
  try {
    const wishlistProduct = await WishlistProduct.findAll({
      order: [["count", "desc"]],
    });

    console.log(wishlistProduct[0].dataValues);
    res.json({
      status: true,
      product: wishlistProduct[0].dataValues,
    });
  } catch (err) {
    res.json({
      status: false,
      err,
    });
  }
};

module.exports = mostWishlistedProduct;
