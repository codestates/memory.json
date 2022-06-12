const dotenv = require("dotenv");
dotenv.config();
const multer = require("multer");
const aws = require("aws-sdk");
// aws.config.loadFromPath(__dirname + "/../../config/s3.js");
const multerS3 = require("multer-s3");
const s3 = new aws.S3({
  "accessKeyId": process.env.S3_ACCESS_KEY_ID,
  "secretAccessKey": process.env.S3_SECRET_KEY,
  "region": process.env.S3_REGION
});
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    key: function (req, file, cb) {
      var ext = file.mimetype.split("/")[1];
      if (!["png", "jpg", "jpeg", "gif", "bmp"].includes(ext)) {
        return cb(new Error("Only images are allowed"));
      }
      cb(null, `images/${Date.now()}${file.originalname.split(".").pop()}`);
    },
  }),
  acl: "public-read-write",
  limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = upload;