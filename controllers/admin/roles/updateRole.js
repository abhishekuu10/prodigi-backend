const db = require("../../../models");
const Role = db.Role;
const RolePermission = db.RolePermission;
const Permission = db.Permission;

const CheckPermission = require("../../auth/checkPermission");

const getRole = async (req, res) => {
  try {
    const { roleName, roleDescription } = req.body;
    // const checkPermission = CheckPermission(role_Name, "get_role");

    // if (checkPermission) {
    const role = await Role.findOne({
      where: {
        roleName,
      },
    });
    if (role) {
      const roleUpdate = await Role.update({
        roleName: roleName || role.datavalues.roleName,
        roleDescription: roleDescription || role.datavalues.roleDescription,
      });
    }

    res.json({
      status: true,
      msg: "role updated",
      Role: role,
    });
    // }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      err,
    });
  }
};

module.exports = getRole;
