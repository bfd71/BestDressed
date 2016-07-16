"use strict";

var scrapers = {};

scrapers["pinterest"] = require("./scrapers/pinterest.js");
scrapers["imgur"] = require("./scrapers/imgur.js");

exports.scrape = function(req, res) {
	var url = req.body.url;			// represent the url the user has provided
	var scraperToUse;


	// pinterest may not work, appears you need to be logged into the site
	// and even that doesn't seem to allow the data collection
	if(url.indexOf("pinterest") > -1) {  // if the url submitted includes "pinterest" use the pinterest scraper
		scraperToUse = "pinterest";
	} else if(url.indexOf("imgur") > -1) {  // if the url submitted includes "imgur" use the imgur scraper
		scraperToUse = "imgur";
	} else {
		console.log("cannot locate scraper");
	}

	scrapers[scraperToUse].list(url, function(data)  {    // function(data) passes in the object created in the pinterest.js 
		console.log("data from scraper: ", data);
		res.json(data); // send it back in json format to make it easier to use in the view
	});
}


