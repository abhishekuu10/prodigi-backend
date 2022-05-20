const db = require("../../../models");
const RolePermission = db.RolePermission;
const Permission = db.Permission;

const CheckPermission = require("../../auth/checkPermission");

const getPermission = async (req, res) => {
  const roleId = req.roleId;
  try {
    const checkPermission = CheckPermission(roleId, "get_Permission");

    // if (checkPermission) {
    const permission = await Permission.findAll({});

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

module.exports = getPermission;
