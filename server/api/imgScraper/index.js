"use strict";

var controller = require("./imgScraper.controller");
var express = require("express");
var router = express.Router();
var auth = require("../../auth/auth.service");

router.post("/scrape", auth.isAuthenticated(), controller.scrape);  // once the user inputs a pintrest pin this route will be called

module.exports = router;