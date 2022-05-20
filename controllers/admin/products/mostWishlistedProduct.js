const db = require("../../../models");
const Wishlist = db.WishlistProduct;
const Sequelize = require("sequelize");

const mostWishlistedProduct = async (req, res) => {
  try {
    const productId = await Wishlist.count({
      where: {
        productId,
      },
    });

    res.json({
      status: true,
      // product: wishlistProduct[0].dataValues,
    });
  } catch (err) {
    res.json({
      status: false,
      err,
    });
  }
};

module.exports = mostWishlistedProduct;
