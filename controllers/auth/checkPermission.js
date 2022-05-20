const db = require("../../models");
const Permission = db.Permission;
const RolePermission = db.RolePermission;

const checkPermission = async (roleId, permName) => {
  try {
    const perm = await Permission.findOne({
      where: {
        permName,
      },
    });
    if (perm) {
      const rolePerm = await RolePermission.findOne({
        where: {
          roleId,
          permId: perm.dataValues.id,
        },
      });
      console.log("rolePerm: ", rolePerm);
      if (rolePerm) {
        return true;
      } else {
        return false;
      }
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = checkPermission;
