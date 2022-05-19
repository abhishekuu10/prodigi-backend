"use strict";
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("Roles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      roleName: {
        type: DataTypes.STRING,
      },
      roleDesciption: {
        type: DataTypes.STRING,
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
    await queryInterface.dropTable("Roles");
  },
};
