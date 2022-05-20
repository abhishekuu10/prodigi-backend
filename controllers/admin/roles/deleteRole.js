const db = require("../../../models");
const Role = db.Role;

const CheckPermission = require("../../auth/checkPermission");

const deleteRole = async (req, res) => {
  try {
    const roleId = req.roleId;
    const { roleName } = req.body;
    const checkPermission = CheckPermission(roleId, "delete_role");

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

      return res.json({
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
