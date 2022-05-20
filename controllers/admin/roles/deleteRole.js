const db = require("../../../models");
const Role = db.Role;
const RolePermission = db.RolePermission;
const Permission = db.Permission;

const CheckPermission = require("../../auth/checkPermission");

const deleteRole = async (req, res) => {
  try {
    const { roleName } = req.query;
    // const checkPermission = CheckPermission(role_Name, "get_role");

    // if (checkPermission) {
    const role = await Role.findOne({
      where: {
        roleName,
      },
    });

    if (role) {
      await Role.destroy({
        where: {
          roleName,
        },
      });

      res.json({
        status: true,
        msg: `${roleName} role deleted`,
      });
    }

    res.status(404).json({
      status: false,
      msg: `${roleName} role not found`,
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

module.exports = deleteRole;
