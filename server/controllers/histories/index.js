const express = require("express");
const router = express.Router();
const upload = require("../../middlewares/uploadphoto/uploadphoto.js")


const registHistory = require("./registHistory");
const searchByPlace = require("./searchByPlace");
const searchByUser = require("./searchByUser");
const searchByFavorite = require("./searchByFavorite");
const changeHistory = require("./changeHistory");
const deleteHistory = require("./deleteHistory");

router.post("/:placeId", upload.array("formData", 10), registHistory);
router.post("/", upload.array("formData", 10), registHistory);
router.get("/place/:placeId", searchByPlace);
router.get("/user/:userId", searchByUser);
router.get("/favorite/:userId", searchByFavorite);
router.patch("/:historyId", changeHistory);
router.delete("/:historyId", deleteHistory);


module.exports = router;