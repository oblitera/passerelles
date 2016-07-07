//-----------------------------
// Require
//-----------------------------
var fs = require("fs");
var cliargs = require('cliargs');
var tools = require('./tools');
var options = require('./options.json');

//-----------------------------
// Define
//-----------------------------

var argsObj = cliargs.parse();

//-----------------------------
// Console
//-----------------------------
if(argsObj.a)
{
	inserer_toutes_les_passerelles();
}

if(argsObj.p)
{
	inserer_une_passerelles(argsObj.p);
}

if(argsObj.h)
{
	help();
}

//-----------------------------
// Convertir
//-----------------------------
function inserer_toutes_les_passerelles()
{
	for(var i in options.passerelles)
	{
		inserer_une_passerelles(options.passerelles[i]);			
	}	
}

function inserer_une_passerelles(cible)
{
	if(options.passerelles.indexOf(cible) != -1)
	{
		var path_passerelle_json = options.path_output+cible+".json";
		console.log(path_passerelle_json);		
	}
	else
	{
		console.log("erreur, passerelle indisponible");
	}
}


//-----------------------------
// Aide
//-----------------------------
function help()
{
	console.log("===== GESTIONAIRE passerelle ==========");
	console.log("-a : insere tout les passerelles");
	console.log("--p=<nom_passrelle> : insere une passerelle specifique");
	console.log("=======================================");
}


exports.inserer_toutes_les_passerelles = inserer_toutes_les_passerelles;
exports.inserer_une_passerelles = inserer_une_passerelles;
exports.help = help;



