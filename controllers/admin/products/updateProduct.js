const db = require("../../../models");
const Product = db.Product;
const CheckPermission = require("../../auth/checkPermission");

const updateProduct = async (req, res) => {
  const { productId } = req.query;
  const roleId = req.roleId;

  var { name, price, description, image } = req.body;

  const checkPermission = CheckPermission(roleId, "update_product");

  if (checkPermission) {
    try {
      var product = await Product.findOne({
        where: {
          id: productId,
        },
      });

      name = product.name !== name ? name : product.name;
      price = product.price !== price ? price : product.price;
      description =
        product.description !== description ? description : product.description;
      image = product.image !== image ? image : product.image;

      const updatedProduct = await Product.update(
        {
          name: name,
          price: price,
          description: description,
          image: image,
          discount,
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
