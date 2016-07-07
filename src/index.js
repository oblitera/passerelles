//-----------------------------
// Require
//-----------------------------
var fs = require("fs");
var cliargs = require('cliargs');
var tools = require('./tools');
var passerelles = require('./liste_passerelles.json');

//-----------------------------
// Define
//-----------------------------
var path_assets = "C:/tools/visiteimmo/passerelles/assets/";
var path_tempo = path_assets + "tempo/";
var path_input = path_assets + "input/";
var path_output = path_assets + "output/";
var argsObj = cliargs.parse();

//-----------------------------
// Console
//-----------------------------
if(argsObj.a)
{
	convertir_toutes_les_passerelles();
}

if(argsObj.p)
{
	convertir_une_passerelles(argsObj.p);
}

if(argsObj.h)
{
	help();
}

//-----------------------------
// Convertir
//-----------------------------
function convertir_toutes_les_passerelles()
{
	for(var i in passerelles)
	{
		convertir_une_passerelles(passerelles[i]);			
	}	
}

function convertir_une_passerelles(cible)
{
	if(passerelles.indexOf(cible) != -1)
	{
		var passerelle = require('./format/'+cible+'.js');
		var path_passerelle = path_input+cible+"/";
		var path_passerelle_json = path_output+"/"+cible+".json";
		var annonces = tools.validations(passerelle.convertir(path_passerelle));
		fs.writeFileSync(path_passerelle_json, JSON.stringify(annonces), "UTF-8");
		console.log(tools.bilan(annonces));		
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
	console.log("-a : importer tout les passerelles");
	console.log("--p=<nom_passrelle> : importer une passerelle specifique");
	console.log("=======================================");
}


exports.convertir_toutes_les_passerelles = convertir_toutes_les_passerelles;
exports.convertir_une_passerelles = convertir_une_passerelles;
exports.help = help;



