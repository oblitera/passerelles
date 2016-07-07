//-----------------------------
// Require
//-----------------------------
var fs = require('fs');

//-----------------------------
// Define
//-----------------------------
var rules_critique = {
	id:"required|min:3|not_in:-1",
	nom:"required|not_in:NC",
	slug:"required|not_in:NC",
	localisation:{
		lat:"numeric",
		lng:"numeric",
	}
};

var default_ville = function() {
	return {
		"id" : "-1",
		"nom" : "NC",
		"slug" : "NC",
		"localisation" : {
			"lat" : 0.00000,
			"lng" : 0.00000,
		}
	};
}

var get_rules_critique = function()
{
	return rules_critique;
}

exports.default_ville = default_ville;
exports.get_rules_critique = get_rules_critique;