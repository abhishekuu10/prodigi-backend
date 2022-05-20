const db = require("../../../models");
const Permission = db.Permission;
const CheckPermission = require("../../auth/checkPermission");

const deletePermission = async (req, res) => {
  const roleId = req.roleId;
  const { permName } = req.body;
  try {
    const checkPermission = CheckPermission(roleId, "delete_permission");

    // if (checkPermission) {

    const permission = await Permission.findOne({
      where: {
        permName,
      },
    });

    if (permission) {
      await Permission.destroy({
        where: {
          permName,
        },
      });

      return res.status(200).json({
        status: true,
        msg: `${permName} permission deleted`,
      });
    }
    res.status(404).json({
      status: false,
      msg: `${permName} permission not found`,
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

module.exports = deletePermission;
