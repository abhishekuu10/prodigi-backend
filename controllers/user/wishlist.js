const db = require("../../models");
const User = db.User;
const Wishlist = db.Wishlist;
const WishlistProduct = db.WishlistProduct;

const Validator = require("../auth/validation");

const addToWishList = async (req, res) => {
  const productId = req.query.productId;
  const username = req.username;
  const { listName } = req.body;

  const validate = await Validator.wishlistValidator(req.body);

  if (!validate?.status) {
    res.status(400).json({
      status: false,
      msg: validate.msg,
    });
  }

  try {
    const user = await User.findOne({
      where: {
        username,
      },
    });
    console;
    const isWishlistExist = await Wishlist.findOne({
      where: {
        userId: user.dataValues.id,
        listName,
      },
    });

    if (!isWishlistExist) {
      const wishlist = await Wishlist.create({
        userId: user.dataValues.id,
        listName,
        productId,
      });

      return res.status(200).json({
        status: true,
        msg: `wishlist ${listName} created `,
        Wishlist: wishlist.dataValues,
      });
    }

    const isProductExist = await Wishlist.findOne({
      where: {
        userId: user.dataValues.id,
        listName,
        productId,
      },
    });

    if (isProductExist) {
      return res.status(409).json({
        status: false,
        msg: `product already exixt in ${listName}`,
      });
    }

    const wishlist = await Wishlist.create({
      userId: user.dataValues.id,
      listName,
      productId,
    });

    return res.status(200).json({
      status: true,
      msg: `product with ${productId} added by ${user.dataValues.username} to wishlist ${listName}`,
      wishlist: wishlist.dataValues,
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: false,
      msg: "couldn't add to wishlist",
      err,
    });
  }
};

const getWishList = async (req, res) => {
  try {
    const username = req.user;

    const user = await User.findOne({
      where: {
        username,
      },
    });

    const wishlist = await Wishlist.findAll({
      where: {
        userId: user.dataValues.id,
      },
      limit: 2,
      offset: (req.query.page - 1) * 2,
    });

    res.status(200).json({
      status: true,
      wish_List: wishlist,
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: false,
      msg: "cannot get wish list",
      err,
    });
  }
};

const deletewishlist = async (req, res) => {
  const { productId } = req.query;
  const { listName } = req.body;

  try {
    const list = await Wishlist.findOne({
      where: {
        listName,
      },
    });
    if (!list) {
      return res.status(404).json({
        status: false,
        msg: "couldn't find wishlist",
      });
    }

    if (!productId) {
      console.log("inside");
      await Wishlist.destroy({
        where: {
          listName,
        },
      });

      return res.status(200).json({
        status: true,
        msg: ` wishlist ${listName} deleted`,
      });
    }
    await Wishlist.destroy({
      where: {
        listName,
        productid,
      },
    });

    return res.status(200).json({
      status: true,
      msg: `product id ${productId} deleted in wishlist ${listName}`,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      err,
    });
  }
};

module.exports = { getWishList, addToWishList, deletewishlist };
