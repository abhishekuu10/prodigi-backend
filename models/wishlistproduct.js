"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WishlistProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Product }) {
      // define association here
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
