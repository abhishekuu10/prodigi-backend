const db = require("../../../models");
const Role = db.Role;
const CheckPermission = require("../../auth/checkPermission");

const createRole = async (req, res) => {
  //   const  roleId = req.roleId;
  const { roleName, roleDescription } = req.body;

  try {
    // const checkPermission = CheckPermission(roleId, "create_role");

    // if (checkPermission) {
    const role = await Role.create({
      roleName,
      roleDescription,
    });

    res.status(200).json({
      status: true,
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

module.exports = createRole;
