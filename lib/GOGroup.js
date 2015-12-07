"use strict";

var urlencode = require('urlencode');
var colors = require('colors');
var sprintf = require("sprintf-js").sprintf;
// var logger = require('./Logger').Logger.get();

var GOGroup = function(str, tester) {
	this.partsraw = str.split(':');
	this.tester = tester;

	// console.log(urlencode.decode('Kontaktl%c3%a6rer%20Framstr%c3%b8m,%20Bernt%20Ole'));
	// console.log("Splitted parts", this.parts);
	this.parts = this.partsraw.map(function(s) {
		return urlencode.decode(s);
	});

	// logger.debug("Splitted parts", this.parts);




};


GOGroup.prototype.info = function(message) {

	console.log(colors.grey(" [ info ] ", message));

}


GOGroup.prototype.checkItem = function(checkresult, message) {
	if (checkresult) {
		console.log(colors.green(" [ OK   ] ", message));
	} else {
		console.log(colors.red(" [Failed] ", message));
	}

}


GOGroup.prototype.verify = function(str) {

	var p = this.parts;
	var descr = ["Gruppe type", "Grep kode", "Org nr", "Gruppe ID", "Dato start", "Dato slutt", "Rolle", "Beskrivende navn"];

	if (p.length === 5) {
		this.info("Skipping this, because it most likely is remaining from the group pilot. (exactly 5 elements detected)");
		return;
	}

	for(var i = 0; i < descr.length; i++) {
		console.log (" " + (i+1) + "  " +colors.magenta( sprintf("%16s", descr[i])) + " " + (i < p.length ? p[i] : colors.grey("NA")));
	}

	this.checkItem(
		(p.length === 4) || (p.length === 8),
		"MUST contain 4 or 8 items, contains " + p.length
	);

	this.checkItem(
		["b", "u", "a"].indexOf(p[0]) !== -1,
		"Group type " + p[0] + " MUST be one of [b, u, a]"
	);
	this.info("Grep code is " + p[1]);

	this.checkItem(
		/NO\d{9}/.test(p[2]),
		"Org nr " + p[2] + " MUST match /NO\\d{9}/"
	);
	this.info("Group identifier (scope: skoleeier) " + p[3]);

	this.checkItem(
		/\d{4}-\d{2}-\d{2}/.test(p[4]),
		"Dato fra " + p[4] + ' MUST match /\\d{4}-\\d{2}-\\d{2}/'
	);

	this.checkItem(
		["student", "member", "faculty", "employee", "staff"].indexOf(p[6]) !== -1,
		"Role " + p[6] + ' MUST be one of ["student", "member", "faculty", "employee", "staff"]'
	);

	this.info("Beskrivende navn " + p[7]);

	var groupid = 'urn:mace:feide.no:go:groupid:' + [ this.partsraw[0], this.partsraw[2], this.partsraw[3], this.partsraw[4], this.partsraw[5]].join(':');
	var groupidIS = this.tester.hasEntitlement(groupid)	;

	if ( p[0] && p[2] && p[3] && p[4] && p[5]) {

		this.checkItem(
			groupidIS,
			"GroupID " + groupid + ' should be present'
		);

	} else {
		this.info("Skipping GROUP ID Check since not all needed values were present ");
	}



}


exports.GOGroup = GOGroup;