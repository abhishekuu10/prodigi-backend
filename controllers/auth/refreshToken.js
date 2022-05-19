const jwt = require("jsonwebtoken");
const db = require("../../models");
const User = db.User;
const { accessKey, refreshKey } = require("../../config/Config");
const cookieParser = require("cookie-parser");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    res.sendStatus(401);
  }
  try {
    const refreshToken = cookies.jwt;
    const user = await User.findAll({
      where: {
        refreshToken,
      },
    });

    // console.log(user);

    if (!user) {
      res.status(403).json({
        status: false,
        msg: "forbidden",
      });
    }

    // evaluate jwt
    jwt.verify(refreshToken, refreshKey, (err, decoded) => {
      if (err || user.name !== decoded.username) {
        res.sendStatus(403);
      }

      const accessToken = jwt.sign(
        { id: decoded.id, username: decoded.name },
        accessKey,
        { expiresIn: "1d" }
      );

      res.json(accessToken);
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: false,
      msg: err,
    });
  }
};

module.exports = { login };
