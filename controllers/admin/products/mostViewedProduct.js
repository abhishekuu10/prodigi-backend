const db = require("../../../models");
const Product = db.Product;

const mostViewedProduct = async (req, res) => {
  try {
    const product = await Product.findAll({
      order: [["views", "desc"]],
    });

    const views = product[0].dataValues.views;

    const arr = product.filter((x) => {
      return x.dataValues.views == views;
    });

    res.json({
      status: true,
      product: arr,
    });
  } catch (err) {
    res.json({
      status: false,
      err,
    });
  }
};

module.exports = mostViewedProduct;
