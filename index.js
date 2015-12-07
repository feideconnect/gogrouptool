"use strict";

var request = require('request');
var colors = require('colors');



var 
	PrefixMatch = require('./lib/PrefixMatch').PrefixMatch,
	GOGroup = require('./lib/GOGroup').GOGroup;


/*
 * Call the correct verify function based upon prefix, 
 * with the remaining part as the argument
 */
var matcher = function(str, objref) {
	var map = {
		"urn:mace:feide.no:go:group:": "verifyGO",
		"urn:mace:feide.no:go:grep:": "verifyGrep"
	};
	var def = "verifyGeneric";
	for(var prefix in map) {
		var pm = new PrefixMatch(prefix, str);
		if (pm.test()) {
			return objref[map[prefix]](pm.remaining());
		}
	}
	return objref[def](str);
}


// Main testing class.
var Tester = function(token) {
	this.token = token;
	this.url = 'https://api.feideconnect.no/userinfo/v1/userinfo';
	this.all = null;
};


Tester.prototype.verifyGeneric = function(data) {
	console.log(colors.grey("Inspecting generic entitlement " + data));

}

Tester.prototype.verifyGrep = function(data) {
	console.log(colors.grey("Inspecting GREP code " + data));
}

Tester.prototype.verifyGO = function(data) {
	console.log(colors.grey("Inspecting GO Group " + data));

	var g = new GOGroup(data, this);
	g.verify();
}

Tester.prototype.hasEntitlement = function(val) {

	// console.log("Check if " + val + " is one of");
	// console.log(this.all);

	for(var i = 0; i < this.all.length; i++) {
		if (this.all[i] === val) {
			return true;
		}
	}
	return false;
}

Tester.prototype.verifyEntitlements = function(data) {
	this.all = data.eduPersonEntitlement;
	for(var i = 0; i < data.eduPersonEntitlement.length; i++) {
		var e = data.eduPersonEntitlement[i];

		console.log();
		matcher(e, this);


		// console.log(colors.green("Processing " + e));
		// var split = e.split(':');
		// console.log(split);

	}

};

Tester.prototype.run = function() {
	var that = this;


	return new Promise(function(resolve, reject) {
		var options = {
			url: that.url,
			headers: {
				'User-Agent': 'LDAP Test Utility',
				'Authorization': 'Bearer ' + that.token
			}
		};
		request(options, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				console.log("--- Result: ---");
				console.log(body); // Show the HTML for the Google homepage. 
				resolve(JSON.parse(body));
			} else {
				console.error("error " + response.statusCode);
				console.error(error);
				console.error(body);
			}
		});
	});


}




if (!process.env.TOKEN) {
	throw new Error("Environment variable TOKEN was not set.");
}
var t = new Tester(process.env.TOKEN);
t.run()
	.then(function(res) {
		t.verifyEntitlements(res);
	})
	.catch(function(err) {
		console.error("ERROR ", err.stack);
		console.error(err);
	});



