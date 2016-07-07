//-----------------------------
// Require
//-----------------------------
var fs = require('fs');
var cliargs = require('cliargs');

//-----------------------------
// Define
//-----------------------------
var default_img = function() {
	return {
		"src" : "",
		"path" : "",
		"upload" : true,
		"is_upload" : false
	};
}

exports.default_img = default_img;