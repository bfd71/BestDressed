var fs = require("fs");
var request = require("request");

exports.downloadURI = function(url, filename, callback) {

	// saves file (code similiar to request example in streaming section of docs)
	request(url)
		.pipe(fs.createWriteStream(filename))
		.on("close", function(){
			callback(filename);
			console.log(filename);
		});
}


// creates a random string of letters and numbers
exports.randomizer = function(length, chars) {
	var result = "";
	for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
	return result
}