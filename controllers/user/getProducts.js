const db = require("../../models");
const Product = db.Product;

const getProducts = async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      const product = await Product.findOne({
        where: {
          id,
        },
      });
      console.log(product.dataValues);
      if (product) {
        await product.update({
          prod_views: product.dataValues.prod_views + 1,
        });
      }

      res.status(200).json({
        status: true,
        products: product,
      });
    }

    const product = await Product.findAll({
      logging: false,
      limit: 10,
      offset: (req.query.page - 1) * 10,
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

module.exports = getProducts;
