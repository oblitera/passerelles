//-----------------------------
// Require
//-----------------------------
var cliargs = require('cliargs');
var tools = require('./tools');
var argsObj = cliargs.parse();
var passerelles = [
	"soyez"
];

//-----------------------------
// Console
//-----------------------------
if(argsObj.a)
{
	for(var i in passerelles)
	{
		traitement_passerelle(passerelles[i]);			
	}
}

if(argsObj.p)
{
	if(passerelles.indexOf(argsObj.p) != -1)
	{
		traitement_passerelle(argsObj.p);	
	}
	else
	{
		console.log("erreur, passerelle indisponible");
	}
}


function traitement_passerelle(cible)
{
	var passerelle = require('./'+cible+'.js');
	var annonces = tools.validations(passerelle.convertir());
	console.log(tools.bilan(annonces));	
}

//-----------------------------
// Help
//-----------------------------
if(argsObj.h)
{
	console.log("===== GESTIONAIRE passerelle ==========");
	console.log("-a : importer tout les passerelles");
	console.log("--p=<nom_passrelle> : importer une passerelle specifique");
	console.log("=======================================");
}



