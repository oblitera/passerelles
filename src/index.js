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
// Define
//-----------------------------
var path_assets = "C:/tools/visiteimmo/passerelles/assets/";
var path_tempo = path_assets + "tempo/";
var path_input = path_assets + "input/";
var path_output = path_assets + "output/";

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
	var passerelle = require('./format/'+cible+'.js');
	var path_passerelle = path_input+cible+"/";
	var annonces = tools.validations(passerelle.convertir(path_passerelle));
	console.log(tools.bilan(annonces));
	//fs.writeFileSync(path_assets+"cible.sql", all_sql, "UTF-8");	
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



