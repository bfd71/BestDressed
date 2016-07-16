// holds the code for scraping the pintrest website
'use strict';

var request = require('request');
var cheerio = require('cheerio');

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
            var $img = $('.post-image img').attr('src'); // get from imgur
            var $desc = $('.post-image img').attr('alt'); // description from imgur

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