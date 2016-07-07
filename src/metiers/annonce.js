//-----------------------------
// Require
//-----------------------------
var fs = require('fs');
var Validator = require('validatorjs');
var m_ville = require('./ville');
var m_agence = require('./agence');

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

var rules_critique = {
	reference:"required|min:3|not_in:NC",
	agence:m_agence.get_rules_critique(),
	ville:m_ville.get_rules_critique(),
};

var rules_warning = {
	prix:"required|integer|not_in:NC",
	description:"required|min:10|not_in:NC",
	commercial : "required|in:"+liste_commerciale.join(),
	type:"required|in:"+liste_type.join(),
	dpe:"required|integer"
};


var default_annonce = function() {
	return {
		"prix":"0",
		"description":"NC",
		"commercial" : "NC",
		"type":"NC",
		"reference":"NC",
		"dpe":"NC",
		"agence": m_agence.default_agence(),
		"ville" : m_ville.default_ville(),
		"images": [],
		"quality": {
			"technique": {
				"niveau":3,
				"erreurs":[]
			}
		}
	};
}


//-----------------------------
// Validations
//-----------------------------
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

	//clean
	data.quality.technique.niveau = 1;
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

exports.default_annonce = default_annonce;
exports.validation = validation;
exports.validations = validations;
exports.bilan = bilan;
exports.correction_error = correction_error;