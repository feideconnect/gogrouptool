"use strict";

var request = require('request');
var colors = require('colors');

var 
	VOOT = require('./lib/VOOT').VOOT;

var Tester = function(token) {
	this.token = token;
};



Tester.prototype.run = function() {
	var voot = new VOOT(this.token);
	return voot.run();
}




if (!process.env.TOKEN) {
	throw new Error("Environment variable TOKEN was not set.");
}
var t = new Tester(process.env.TOKEN);
t.run()
	.catch(function(err) {
		console.error("ERROR ", err.stack);
		console.error(err);
	});



