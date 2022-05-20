const db = require("../../../models");
const Permission = db.Permission;
const RolePermission = db.RolePermission;
const CheckPermission = require("../../auth/checkPermission");

const deletePermission = async (req, res) => {
  const { role_Name } = req.roleName;
  const { permName, permDescription } = req.body;
  try {
    const checkPermission = CheckPermission(role_Name, "create_permission");

    if (checkPermission) {
      const permission = Permission.create({
        permName,
        permDescription,
      });

      res.json({
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

module.exports = deletePermission;
