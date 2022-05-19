const db = require("../../models");
const User = db.User;
const Wishlist = db.Wishlist;
const WishlistProduct = db.WishlistProduct;

const Validator = require("../auth/validation");

const addToWishList = async (req, res) => {
  const product_id = req.query.productId;
  const username = req.user;
  const { list_name } = req.body;

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

    var wishlist = await Wishlist.findOne({
      where: {
        user_id: user.dataValues.user_id,
        list_name: list_name,
      },
    });

    var wishlistProduct = await WishlistProduct.findOne({
      where: {
        product_id,
      },
    });

    if (!wishlistProduct) {
      wishlistProduct = await WishlistProduct.create({
        product_id,
        count: 1,
      });
    } else {
      await wishlistProduct.update({
        count: wishlistProduct.dataValues.count + 1,
      });
    }

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user_id: user.dataValues.user_id,
        list_name,
        product_id: [product_id],
      });

      res.status(200).json({
        status: true,
        msg: `wish list ${list_name} created by user ${user.dataValues.user_id}`,
        wishlist,
      });
    }

    var arr = [...wishlist.dataValues.product_id];
    if (!arr.includes(parseInt(product_id))) {
      arr.push(product_id);
    } else {
      res.json({
        status: true,
        msg: `product with id ${product_id} already added to wish list`,
        wish_list: wishlist.dataValues,
      });
    }

    wishlist = await Wishlist.update(
      {
        product_id: arr,
      },
      {
        where: {
          list_name,
          user_id: user.dataValues.user_id,
        },
      }
    );

    res.json({
      status: true,
      msg: `product with id ${product_id} added to wish list`,
      wish_list: wishlist[0].dataValues,
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
        user_id: user.dataValues.user_id,
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
  const { list_name } = req.body;

  try {
    const product = await Wishlist.findOne({
      where: {
        list_name: list_name,
      },
    });
    var delProduct = product.dataValues.product_id;
    var arr = delProduct.splice(delProduct.indexOf(productId), 1);
    console.log(arr);
    const wishlist = await Wishlist.update({
      where: {
        product_id: delProduct,
      },
    });

    res.status(200).json({
      status: true,
      wishlist,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      err,
    });
  }
};

module.exports = { getWishList, addToWishList, deletewishlist };
