const db = require("../../models");
const Product = db.Product;
const CheckPermission = require("../auth/checkPermission");

const addProduct = async (req, res) => {
  const { roleName } = req.roleName;
  const { name, description, price, image, discount, brand } = req.body;

  try {
    const checkPermission = CheckPermission(roleName, "add_product");

    console.log(checkPermission);

    if (checkPermission) {
      const product = await Product.create({
        brand,
        discount,
        name,
        description,
        image,
        price,
      });

      res.json({
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
