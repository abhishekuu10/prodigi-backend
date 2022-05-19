"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("WishlistProducts", {
      productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable("WishlistProducts");
  },
};
