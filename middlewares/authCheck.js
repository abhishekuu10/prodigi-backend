const jwt = require("jsonwebtoken");
const { accessKey } = require("../config/Config");

const authCheck = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    res.status(401).json({
      status: false,
      msg: "forbidden",
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, accessKey, (err, decoded) => {
    if (err) {
      res.sendStatus(403);
    }
    req.user = decoded.username;

    req.roleName = decoded.roleName;

    next();
  });
};

module.exports = authCheck;
