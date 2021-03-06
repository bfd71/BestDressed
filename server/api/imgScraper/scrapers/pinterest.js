// holds the code for scraping the pintrest website
'use strict';

var request = require('request');
var cheerio = require('cheerio');

    // pinterest may not work, appears you need to be logged into the site
    // and even that doesn't seem to allow the data collection

exports.list = function(url, cb) {
    request(url, function(error, resp, body) {
        if (error) {
            cb({
                error: error
            });
        }
        if (!error) {
            var $ = cheerio.load(body); // standard way of referencing the body of a cheerio object
            var pin = {};
            var $url = url;
            var $img = $('.heightContainer img').attr('src'); // get from pintrest
            var $desc = $('.heightContainer img').attr('alt'); // description from pintrest

            console.log($img + ' pin url');

            var pin = {
                img: $img,
                url: $url,
                desc: $desc
            }

            // respond with the final JSON object
            cb(pin);
        }
    });
}