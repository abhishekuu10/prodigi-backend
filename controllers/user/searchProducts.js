const db = require("../../models");
const Product = db.Product;
const Sequelize = require("sequelize");

const searchProducts = async (req, res) => {
  var { name, brand, discount } = req.query;
  try {
    const product = await Product.findAll({
      logging: false,
      where: {
        name: { [Sequelize.Op.like]: `%${name}%` },
        // brand: brand || null,
        // discount: discount || null,
      },
      limit: 10,
    });

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
