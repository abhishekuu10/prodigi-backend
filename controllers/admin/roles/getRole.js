const db = require("../../../models");
const Role = db.Role;
const RolePermission = db.RolePermission;
const Permission = db.Permission;

const CheckPermission = require("../../auth/checkPermission");

const getRole = async (req, res) => {
  try {
    const checkPermission = CheckPermission(roleId, "get_role");

    if (checkPermission) {
      const role = await Role.findAll({
        // include: ["user"],
      });

      res.json({
        status: true,
        Role: role,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      err,
    });
  }
};

module.exports = getRole;
