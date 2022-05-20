const db = require("../../../models");
const Role = db.Role;

const CheckPermission = require("../../auth/checkPermission");

const updateRole = async (req, res) => {
  try {
    const roleId = req.roleId;
    const { role_id } = req.query;
    const { roleName, roleDescription } = req.body;
    const checkPermission = CheckPermission(roleId, "update_role");

    // if (checkPermission) {
    const role = await Role.findOne({
      where: {
        id: role_id,
      },
    });
    if (role) {
      await Role.update(
        {
          roleName: roleName || role.dataValues.roleName,
          roleDescription: roleDescription || role.dataValues.roleDescription,
        },
        {
          where: {
            id: roleId,
          },
        }
      );

      res.json({
        status: true,
        msg: `role ${roleName} updated`,
      });
    }
    // }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      err,
    });
  }
};

module.exports = updateRole;
