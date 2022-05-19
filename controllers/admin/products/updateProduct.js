const db = require("../../models");
const Product = db.Product;
const CheckPermission = require("../auth/checkPermission");

const updateProduct = async (req, res) => {
  const { productId } = req.query;

  var { name, price, description, image } = req.body;

  const checkPermission = CheckPermission(req.user.role_id, "update_product");

  if (checkPermission) {
    try {
      var product = await Product.findOne({
        where: {
          id: productId,
        },
      });

      name = product.prod_name !== name ? name : product.prod_name;
      price = product.prod_price !== price ? price : product.prod_price;
      description =
        product.prod_description !== description
          ? description
          : product.prod_description;
      image = product.prod_image !== image ? image : product.prod_image;

      const updatedProduct = await Product.update(
        {
          prod_name: name,
          prod_price: price,
          prod_description: description,
          prod_image: image,
        },
        {
          returning: true,
          where: {
            id: productId,
          },
        }
      );
      res.json({
        status: true,
        product: updatedProduct[1][0].dataValues,
      });
    } catch (err) {
      res.json({
        status: false,
        err,
      });
    }
  }

  res.status(401).json({
    status: false,
    msg: "forbidden, don't have permission",
  });
};

module.exports = updateProduct;
