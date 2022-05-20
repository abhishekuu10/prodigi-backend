const db = require("../../../models");
const Product = db.Product;
const CheckPermission = require("../../auth/checkPermission");

const addProduct = async (req, res) => {
  const roleId = req.roleId;
  const { name, description, price, image, discount, brand } = req.body;

  try {
    console.log("roleId add: ", roleId);

    const checkPermission = await CheckPermission(roleId, "add_product");

    console.log("checkPermission: ", checkPermission);

    if (checkPermission) {
      const product = await Product.create({
        brand,
        discount,
        name,
        description,
        image,
        price,
      });

      return res.json({
        status: true,
        product,
      });
    }
    res.json({
      status: false,
      msg: "forbidden",
    });
  } catch (err) {
    res.json({
      status: false,
      err,
    });
  }
};

module.exports = addProduct;
