//-----------------------------
// Require
//-----------------------------
var fs = require('fs');
var xml = require('pixl-xml');

//-----------------------------
// Define
//-----------------------------
var file_exist = function(path) {
	try 
	{
	    fs.accessSync(path, fs.F_OK);
	    return true;
	} 
	catch (e) 
	{
	    return false;
	}
}

var open_and_parse_xml = function(path)
{
	try
	{
		var fichier = fs.readFileSync(path, "UTF-8");
		var data = xml.parse(fichier);
		return data;
	}
	catch(e)
	{
		return false;
	}
}

exports.file_exist = file_exist;
exports.open_and_parse_xml = open_and_parse_xml;