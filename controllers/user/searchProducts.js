const db = require("../../models");
const Product = db.Product;
const Sequelize = require("sequelize");

const searchProducts = async (req, res) => {
  const { name, brand, type, discount, price } = req.query;
  try {
    const product = await Product.findAll({
      logging: false,
      where: {
        prod_name: { [Sequelize.Op.like]: `%${name}%` },
        // prod_brand: brand,
        // prod_discount: discount,
        // prod_price: price,
      },
      limit: 10,
    });
    const viewCount = await Product.update({
      prod_views: pr,
    });
    console.log(product);
    res.status(200).json({
      status: true,
      products: product,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      msg: err,
    });
  }
};
module.exports = searchProducts;
