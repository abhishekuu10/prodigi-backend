"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WishlistProduct extends Model {
    static associate({ Product }) {
      this.belongsTo(Product, {
        foreignKey: "productId",
        as: "product",
      });
    }
  }
  WishlistProduct.init(
    {
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "WishlistProduct",
    }
  );
  return WishlistProduct;
};
