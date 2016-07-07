//-----------------------------
// Require
//-----------------------------
var fs = require('fs');
var xml = require('pixl-xml');
var Validator = require('validatorjs');
var child_process = require('child_process');
var slugify = require('slugify');
var request = require('sync-request');

//-----------------------------
// Define
//-----------------------------
var liste_type = [
	"maison",
	"appartement",
	"terrain",
	"commerce"
];

var liste_commerciale = [
	"vente",
	"location",
	"neuf"
];

//-----------------------------
// Get Default Item
//-----------------------------
var default_annonce = function() {
	return {
		"prix":"0",
		"description":"NC",
		"commercial" : "NC",
		"type":"NC",
		"reference":"NC",
		"dpe":"NC",
		"images": [],
		"quality": {
			"technique": {
				"niveau":1,
				"erreurs":[]
			}
		}
	};
}

var default_img = function() {
	return {
		"src" : "",
		"path" : "",
		"upload" : true,
		"is_upload" : false
	};
}

//-----------------------------
// Validations
//-----------------------------
//condition critique
var rules_critique = {
	reference:"required|min:3",
	agence:"required|min:3",
	ville:"required|min:3",
};

//condition warning
var rules_warning = {
	prix:"required|integer",
	description:"required|min:10",
	commercial : "required|in:"+liste_commerciale.join(),
	type:"required|in:"+liste_type.join(),
	reference:"required",
	dpe:"required|integer"
};

var validations = function(datas)
{
	var candidats = [];
	for(var i in datas)
	{
		candidats.push(validation(datas[i]));
	}
	return candidats;
}

var validation = function(data)
{
	//critique
	var validateur = new Validator(data, rules_critique);
	var validation = validateur.passes();
	if(!validation)
	{
		data.quality.technique.niveau = 3;
		data.quality.technique.erreur = validateur.errors.all();
		return data;
	}

	//warning
	validateur = new Validator(data, rules_warning);
	validation = validateur.passes();	
	if(!validation)
	{
		data.quality.technique.niveau = 2;
		data.quality.technique.erreur = validateur.errors.all();
		data = correction_error(data,data.quality.technique.erreur);
		return data;
	}

	return data;
}

var correction_error = function(data, erreurs)
{
	if(erreurs.prix != undefined)
	{
		data.prix = "NC";
	}

	if(erreurs.description != undefined)
	{
		data.description = "";
	}

	if(erreurs.commercial != undefined)
	{
		data.commercial = "NC";
	}

	if(erreurs.type != undefined)
	{
		data.type = "NC";
	}

	if(erreurs.dpe != undefined)
	{
		data.type = "NC";
	}

	return data;
}

var bilan = function(datas)
{
	var niveau1 = 0;
	var niveau2 = 0;
	var niveau3 = 0;

	for(var i in datas)
	{
		if(datas[i].quality.technique.niveau == 1)
		{
			niveau1 += 1;
		}

		if(datas[i].quality.technique.niveau == 2)
		{
			niveau2 += 1;
		}

		if(datas[i].quality.technique.niveau == 3)
		{
			niveau3 += 1;
		}
	}

	return "Bilan : "+niveau1+" annonces valides, "+niveau2+" annonce en warning, "+niveau3+" annonce en erreur critique"; 
}


//-----------------------------
// Files gestions
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

//------------------------
// Recherche Ville
//------------------------
var recherche_id_ville = function(cp, ville)
{
	var commande = 'http://villess.dev/villes?f=ini';
	var buffer = false;
	var resultat = false;

	if(!cp && !ville)
	{
		return false;
	}

	if(cp)
	{
		commande += '&cp='+cp;
	}

	if(ville)
	{
		commande += '&slug='+slugify(ville);
	}

	try
	{
		var res = request('GET', commande);
		var resultat = res.getBody("UTF-8");
		return resultat;
	}
	catch(e)
	{
		return false;
	}

}


exports.default_annonce = default_annonce;
exports.default_img = default_img;
exports.file_exist = file_exist;
exports.open_and_parse_xml = open_and_parse_xml;
exports.validation = validation;
exports.validations = validations;
exports.bilan = bilan;
exports.recherche_id_ville = recherche_id_ville;