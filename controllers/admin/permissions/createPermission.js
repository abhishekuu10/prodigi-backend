const db = require("../../../models");
const Permission = db.Permission;
const Role = db.Role;
const RolePermission = db.RolePermission;
const CheckPermission = require("../../auth/checkPermission");

const createPermission = async (req, res) => {
  const roleId = req.roleId;
  const { role_name } = req.query;
  const { permName, permDescription } = req.body;
  try {
    const checkPermission = CheckPermission(roleId, "create_permission");

    if (checkPermission) {
      const permission = await Permission.create({
        permName,
        permDescription,
      });

      const role = await Role.findOne({
        where: {
          roleName: role_name,
        },
      });

      const rolePermission = await RolePermission.create({
        permId: permission.dataValues.id,
        roleId: role.dataValues.id,
      });

      return res.json({
        status: true,
        permission,
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

module.exports = createPermission;
