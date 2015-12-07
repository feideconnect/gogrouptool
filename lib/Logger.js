"use strict";

var bunyan = require('bunyan');



var loggerinstance = null;

var Logger = function() {

};

Logger.init = function() {
	console.error("INit");
	loggerinstance = bunyan.createLogger({
		name: 'Verify',
		stream: process.stdout,
		level: 'debug'
	});
	return loggerinstance;
}

Logger.get = function() {
	if (loggerinstance === null) {
		this.init();
	}
	return loggerinstance;
}


exports.Logger = Logger;