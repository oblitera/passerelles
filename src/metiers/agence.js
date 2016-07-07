//-----------------------------
// Require
//-----------------------------
var fs = require('fs');

//-----------------------------
// Define
//-----------------------------
var rules_critique = {
	id:"required|min:3|not_in:-1",
	nom:"required|min:3|not_in:NC",
	telephone:"required|not_in:NC",
	email:"required|not_in:NC",
};

var default_agence = function() {
	return {
		"id" : "-1",
		"nom" : "NC",
		"telephone" : "NC",
		"email" : "NC"
	};
}

var get_rules_critique = function()
{
	return rules_critique;
}

exports.default_agence = default_agence;
exports.get_rules_critique = get_rules_critique;