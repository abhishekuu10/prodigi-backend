const db = require("../../models");
const Product = db.Product;

const mostViewedProduct = async (req, res) => {
  try {
    const product = await Product.findAll({
      order: [["prod_views", "desc"]],
    });

    res.json({
      status: true,
      product: product[0].dataValues,
    });
  } catch (err) {
    res.json({
      status: false,
      err,
    });
  }
};

module.exports = mostViewedProduct;
