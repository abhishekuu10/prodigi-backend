const db = require("../../models");
const Role = db.Role;
const CheckPermission = require("../auth/checkPermission");

const createRole = async (req, res) => {
  //   const { role_Name } = req.roleName;
  const { roleName, roleDescription } = req.body;

  try {
    // const checkPermission = CheckPermission(role_Name, "create_role");

    // if (checkPermission) {
    const role = await Role.create({
      roleName,
      roleDescription,
    });

    res.json({
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
