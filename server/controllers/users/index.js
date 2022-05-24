const express = require("express");
const router = express.Router();
const upload = require("../../middlewares/uploadprofile/uploadprofile.js");

const userInfo = require("./userInfo");
const secession = require("./secession");
const change = require("./change");
const signup = require("./signup");
const signin = require("./signin");
const signout = require("./signout");
const socialByGoogle = require("./socialByGoogle");
const socialByKakao = require("./socialByKakao");
const profile = require("./profile");

router.get("/", userInfo);
router.delete("/", secession);
router.patch("/", change);
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.post("/socialByGoogle", socialByGoogle);
router.post("/socialByKakao", socialByKakao);
router.post("/profile", upload.single("profile"), profile);


module.exports = router;
