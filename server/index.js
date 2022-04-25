const express = require("express");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const { sequelize } = require("./models");
const app = express();
const cookieParser = require("cookie-parser");
const controllers = require("./controllers");

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(cookieParser());

app.use("/", controllers);
app.use("/", (req, res) => {
  res.send("memory.json 화이팅 합시다.!!!!");
});

sequelize
  .sync({
    force: false,
  })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

let server;
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log("https server runnning"));
} else {
  server = app.listen(HTTPS_PORT, () => console.log("http server runnning"));
}

module.exports = server;
