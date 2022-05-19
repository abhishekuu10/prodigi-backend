const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const Config = require("./config/Config");
const db = require("./models");
const cookieParser = require("cookie-parser");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors({ origin: "*" }));

app.use(cookieParser());

app.get("/", (req, res) =>
  res.status(200).json({
    success: true,
    message: "running normally...",
    result: {
      name: Config.app.name,
      env: Config.env,
      version: Config.app.version,
      build: Config.app.build,
    },
  })
);

app.use("/api", require("./routes").router);

app.use((req, res) => {
  const error = new Error("route not found");
  return res.status(404).json({
    success: false,
    message: error.message,
    name: Config.app.name,
    env: Config.env,
    version: Config.app.version,
    build: Config.app.build,
  });
});

const httpServer = http.createServer(app);
db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database is connected");
    httpServer.listen(8050, () =>
      console.log(`server started in port ${Config.port}`)
    );
  })
  .catch((err) => console.log(err));
