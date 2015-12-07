"use strict";


var PrefixMatch = function(prefix, str) {
	this.prefix = prefix;
	this.str = str;
};

PrefixMatch.prototype.test = function() {
	return (this.str.indexOf(this.prefix) !== -1);
}

PrefixMatch.prototype.remaining = function() {
	return this.str.substring(this.prefix.length);
}


exports.PrefixMatch = PrefixMatch;

