"use strict";

var request = require('request');
var urlencode = require('urlencode');
var colors = require('colors');
var sprintf = require("sprintf-js").sprintf;
// var logger = require('./Logger').Logger.get();

var VOOT = function(token, tester) {
	this.token = token;
	this.tester = tester;

	this.baseURL = 'https://groups-api.dataporten.no';

};



VOOT.prototype.execute = function(url) {
	var that = this;
	return new Promise(function(resolve, reject) {
		var options = {
			url: that.baseURL + url,
			headers: {
				'User-Agent': 'LDAP Test Utility',
				'Authorization': 'Bearer ' + that.token
			}
		};
		request(options, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				// console.log("--- Result: ---");
				// console.log(body); // Show the HTML for the Google homepage.
				resolve(JSON.parse(body));
				console.log("Request ID is " + response.headers['x-request-id']);
			} else {
				console.log("response", response);
				if (response) {
						console.error("error " + response.statusCode);
				}

				console.error(error);
				console.error(body);
			}
		});
	});

}


VOOT.prototype.getGroups = function() {
	return this.execute('/groups/me/groups');
}

VOOT.prototype.run = function() {


	return this.getGroups()
		.then(function(data) {
			console.log("Groups");
			console.log(JSON.stringify(data, undefined, 2));
		});

}




exports.VOOT = VOOT;
