"use strict";
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const Config = require("../config/Config");

const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(
  Config.db.database,
  Config.db.user,

  Config.db.password,
  {
    dialect: "postgres",
    host: Config.db.host,
    port: Config.db.port,
  }
);

fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
