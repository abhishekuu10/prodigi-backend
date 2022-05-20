const db = require("../../../models");
const Permission = db.Permission;
const CheckPermission = require("../../auth/checkPermission");

const updatePermission = async (req, res) => {
  const roleId = req.roleId;
  const { permId } = req.query;
  const { permName, permDescription } = req.body;
  try {
    // const checkPermission = CheckPermission(roleId, "update_permission");

    // if (checkPermission) {
    const permission = Permission.update(
      {
        permName,
        permDescription,
      },
      {
        returning: true,
        where: {
          id: permId,
        },
      }
    );

    return res.json({
      status: true,
      permission,
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

module.exports = updatePermission;
