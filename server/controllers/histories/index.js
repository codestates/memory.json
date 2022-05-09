const express = require("express");
const router = express.Router();

// const express = require("express");
const app = express();
const multer = require("multer");
const aws = require("aws-sdk");
aws.config.loadFromPath(__dirname + "/../../config/s3.json");
const multerS3 = require("multer-s3");
const { photo } = require("../../models");
const s3 = new aws.S3();
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "testburkey",
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

const registHistory = require("./registHistory");
const searchByPlace = require("./searchByPlace");
const searchByUser = require("./searchByUser");
const searchByFavorite = require("./searchByFavorite");
const changeHistory = require("./changeHistory");
const deleteHistory = require("./deleteHistory");
const uploadPhoto = require("./uploadphoto");

router.post("/uploadphoto", upload.single("file"), uploadPhoto);
router.post("/:placeId", registHistory);
router.post("/", registHistory);
router.get("/place/:placeId", searchByPlace);
router.get("/user/:userId", searchByUser);
router.get("/favorite/:userId", searchByFavorite);
router.patch("/:historyId", changeHistory);
router.delete("/:historyId", deleteHistory);


module.exports = router;
