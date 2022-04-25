const express = require("express");
const cors = require("cors");
const https = require("https");
const fs = require("fs");

const app = express();

const HTTPS_PORT = process.env.HTTPS_PORT || 80;

app.use('/',(req, res)=>{
  res.send('memory.json 화이팅 합시다.!!!!')
  })


let server;
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
const credentials = { key: privateKey, cert: certificate };

server = https.createServer(credentials, app);
server.listen(HTTPS_PORT, () => console.log("https server runnning"));
} else {
server = app.listen(HTTPS_PORT, () => 
console.log("http server runnning"))
}

module.exports = server; 