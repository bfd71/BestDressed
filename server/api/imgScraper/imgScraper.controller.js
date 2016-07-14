"use stric";

var scrapers = {};

scrapers["pintrest"] = require("./scrapers/pintrest.js");
// scrapers["instagram"] = require("./scrapers/instagram.js");

exports.scrape = function(req, res) {
	var url = req.body.url;			// represent the url the user has provided
	var scraperToUse;

	if(url.indexOf("pintrest") > -1) {  // if the url submitted includes "pintrest" use the pintrest scraper
		scraperToUse = "pintrest";
	} else {
		console.log("cannot locate scraper");
	}

	scrapers[scraperToUse].list(url, function(data))  {// function(data) passes in the object created in the pintrest.js 
		console.log("data from scraper: ", data);
		res.json(data); // send it back in json format to make it easier to use in the view
	}
}