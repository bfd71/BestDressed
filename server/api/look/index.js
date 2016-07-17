"use strict";

var controller = require("./look.controller");
var express = require("express");
var router = express.Router();
var auth = require("../../auth/auth.service");

// download image and save to db
router.post("/scrapeUpload", auth.isAuthenticated(), controller.scrapeUpload);
router.get("/getAllLooks", controller.allLooks);


module.exports = router;