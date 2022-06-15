import * as express from "express";
import * as cors from "cors";
import * as https from "https";
import * as fs from "fs";
import { sequelize } from "./models";
const app = express();
import * as controllers from "./controllers";
import * as logger from "./config/winston";
import * as morgan from "morgan";
import * as swaggerUi from "swagger-ui-express";
import * as ymal from "yamljs";
import * as path from "path";

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;
const HTTP_PORT = process.env.HTTP_PORT || 4000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_HOST || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(morgan("dev"));

// swagger
const swaggerSpec = ymal.load(
  path.join(__dirname, './build/swagger.yaml')
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 컨트롤러
app.use("/", controllers);

app.use("/", (req, res) => {
  res.send("memory.json 화이팅 합시다.!!!!");
});

sequelize
  .sync({
    force: true,
  })
  .then(() => {
    console.log("데이터베이스 연결 성공");
    logger.info("데이터베이스가 연결되었습니다.");
  })
  .catch((err: any) => {
    console.error(err);
    logger.error(err);
  });

let server;
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => {
    console.log("https server runnning");
    logger.info("https로 서버가 켜졌어요");
  });
} else {
  server = app.listen(HTTP_PORT, () => {
    console.log("http server runnning");
    logger.info("http로 서버가 켜졌어요");
  });
}

module.exports = server;
