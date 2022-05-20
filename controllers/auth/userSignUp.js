const bcrypt = require("bcryptjs");
const Validator = require("./validation");
const db = require("../../models");
const User = db.User;
const Permission = db.Permission;
const Role = db.Role;

const signUp = async (req, res) => {
  const result = await Validator.userValidator(req.body);

  if (!result?.status) {
    res.status(500).json({
      status: false,
      msg: result.msg,
      roleId: 2,
    });
  }
  const { name, email, password, username } = req.body;

  const hash = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      name,
      email,
      username,
      password: hash,
      roleId: 2,
    });
    return res.status(200).json({
      status: true,
      msg: "user created sucessfully",
      user: user.dataValues,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      err,
      msg: "cannot create user",
    });
  }
};

module.exports = { signUp };
