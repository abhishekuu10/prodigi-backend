const db = require("../../models");
const RolePermission = db.RolePermission;
const Permission = db.Permission;

const CheckPermission = require("../auth/checkPermission");

const getPermission = async (req, res) => {
  try {
    // const checkPermission = CheckPermission(role_Name, "get_role");

    // if (checkPermission) {
    const permission = Permission.findAll({
      //   include: ["role"],
    });

    res.json({
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
