"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Permission, RolePermission }) {
      // define association here

      this.hasMany(User, {
        foreignKey: "roleId",
        as: "user",
      });

      this.hasMany(RolePermission, {
        as: "role",
        foreignKey: "roleId",
      });
    }
  }
  Role.init(
    {
      roleName: {
        type: DataTypes.STRING,
        unique: true,
      },
      roleDescription: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
