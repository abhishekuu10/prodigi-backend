"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Role, RolePermission }) {
      // define association here
      this.belongsToMany(Role, {
        through: RolePermission,
        as: "role",
        foreignKey: "permName",
      });
    }
  }
  Permission.init(
    {
      permName: {
        type: DataTypes.STRING,
        unique: true,
      },
      permDescription: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Permission",
    }
  );
  return Permission;
};
