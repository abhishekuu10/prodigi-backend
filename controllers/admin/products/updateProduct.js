const db = require("../../../models");
const Product = db.Product;
const CheckPermission = require("../../auth/checkPermission");

const updateProduct = async (req, res) => {
  const { productId } = req.query;
  const roleId = req.roleId;

  var { name, price, description, image, discount } = req.body;

  const checkPermission = CheckPermission(roleId, "update_product");

  // if (checkPermission) {
  try {
    var product = await Product.findOne({
      where: {
        id: productId,
      },
    });

    const updatedProduct = await Product.update(
      {
        name: name || product.dataValues.name,
        price: price || product.dataValues.price,
        description: description || product.dataValues.description,
        image: image || product.dataValues.image,
        discount: discount || product.dataValues.discount,
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
};

// res.status(401).json({
//   status: false,
//   msg: "forbidden, don't have permission",
// });
// };

module.exports = updateProduct;
