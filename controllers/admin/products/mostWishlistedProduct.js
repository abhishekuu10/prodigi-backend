const db = require("../../../models");
const Wishlist = db.WishlistProduct;
const Sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");

const mostWishlistedProduct = async (req, res) => {
  try {
    const [results, metadata] = await db.sequelize.query(
      `SELECT "productId",COUNT("productId")  
      FROM "Wishlists" 
      GROUP BY "productId";`
    );

    var count = 0;
    const arr = results.reduce((acc, curr) => {
      if (curr.count > count) {
        count = curr.count;
        acc = curr;
      }
      return acc;
    }, {});

    count = arr.count;
    var ans = results.filter((x) => {
      return x.count === count;
    });

    res.json({
      status: true,
      product: ans,
    });
  } catch (err) {
    res.json({
      status: false,
      err,
    });
  }
};

module.exports = mostWishlistedProduct;
