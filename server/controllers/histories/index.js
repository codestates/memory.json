const express = require("express");
const router = express.Router();

const registHistory = require("./registHistory");
const searchByPlace = require("./searchByPlace");
const searchByUser = require("./searchByUser");
const searchByFavorite = require("./searchByFavorite");
const changeHistory = require("./changeHistory");

router.post("/:placeId", registHistory);
router.get("/place/:placeId", searchByPlace);
router.get("/user/:userId", searchByUser);
router.get("/favorite/:userId", searchByFavorite);
router.patch("/:historyId", changeHistory);

module.exports = router;
