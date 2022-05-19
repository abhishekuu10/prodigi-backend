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

      this.belongsToMany(Permission, {
        through: RolePermission,
        as: "permission",
        foreignKey: "roleName",
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
