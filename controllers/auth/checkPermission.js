const db = require("../../models");
const Permission = db.Permission;
const RolePermission = db.RolePermission;

const checkPermission = async (roleName, permName) => {
  try {
    const perm = await Permission.findOne({
      where: {
        permName,
      },
    });
    if (perm) {
      const rolePerm = RolePermission.findOne({
        where: {
          roleName,
          permName: perm.datavalues.permName,
        },
      });
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
