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
		var passerelle = require('./'+passerelles[i]+'.js');
		var annonces = tools.validations();
		console.log(tools.bilan(annonces));			
	}
}

if(argsObj.p)
{
	if(passerelles.indexOf(argsObj.p) != -1)
	{
		var passerelle = require('./'+argsObj.p+'.js');
		var annonces = tools.validations(passerelle.convertir());
		console.log(tools.bilan(annonces));		
	}
	else
	{
		console.log("erreur, passerelle indisponible");
	}
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



