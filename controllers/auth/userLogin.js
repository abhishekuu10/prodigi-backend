const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../../models");
const User = db.User;
const Role = db.Role;

const { accessKey, refreshKey } = require("../../config/Config");

const login = async (req, res) => {
  const { password, username } = req.body;

  try {
    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      res.status(500).json({
        status: false,
        msg: "invalid username or password",
      });
    }

    const role = await Role.findOne({
      where: {
        id: user.dataValues.roleId,
      },
    });

    const roleName = role.dataValues.roleName;

    if (await bcrypt.compare(password, user.dataValues.password)) {
      const accessToken = jwt.sign(
        {
          id: user.dataValues.id,
          username: user.dataValues.username,
          roleName: roleName,
        },
        accessKey,
        { expiresIn: "1d" }
      );
      const refreshToken = jwt.sign(
        {
          id: user.dataValues.id,
          username: user.dataValues.username,
        },
        refreshKey,
        { expiresIn: "2d" }
      );
      await User.update(
        { refreshToken },
        {
          where: { username },
        }
      );
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.status(200).json({
        status: true,
        accesstoken: accessToken,
      });
    }

    res.status(500).json({
      status: false,
      msg: "invalid username or password",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      err,
      msg: "couldn't login , internal server errorr",
    });
  }
};

module.exports = { login };
