//-----------------------------
// Require
//-----------------------------
var fs = require("fs");

var path = "C:/tools/visiteimmo/note/assets";
var path_input = "C:/tools/visiteimmo/note/assets/input/";
var path_tempo = "C:/tools/visiteimmo/note/assets/tempo/";
var path_output = "C:/tools/visiteimmo/note/assets/output/";

var liste = fs.readdirSync(path_input);
var expr_titre = /<h1>(.+)<\/h1>/;
var expr_cp = /\(([0-9]+)\)/;
var expr_note_globale = /<p id="ng" style=".+">(([0-9]+|,)+)/;
var expr_note_table = /<table id="tablonotes">(.+)<\/table>/;
var expr_note_detaille = /(([0-9]+|,)+)/g;
var expr_nb_commentaire = /<a href="#voircomm">Notes obtenues sur ([0-9]+) éval/;


for(var i in liste)
{
	var tempo = {
		titre : "",
		cp: "",
		nom: "",
		note_globale: -1,
		note_detaille: {
			environnement : -1,
			transports : -1,
			securite : -1,
			sante : -1,
			loisirs : -1,
			culture : -1,
			enseignement : -1,
			commerces : -1,
			qualitedevie : -1,
		},
		nb_avis : 0,
	}

	fichier = fs.readFileSync(path_input+"/"+liste[i], "UTF-8");

	var match_titre = expr_titre.exec(fichier);
	if(match_titre != null)
	{
		tempo.titre = match_titre[1];
		var match_cp = expr_cp.exec(tempo.titre) 
		if(match_cp != null)
		{
			tempo.cp = match_cp[1];
			tempo.nom = tempo.titre.replace(tempo.cp, "");
			tempo.nom = tempo.nom.replace("(", "");
			tempo.nom = tempo.nom.replace(")", "");
		}
	}

	var match_note = expr_note_globale.exec(fichier);
	if(match_note != null)
	{
		tempo.note_globale = match_note[1];
	}

	var match_note_table = expr_note_table.exec(fichier);
	if(match_note_table != null)
	{
		var tabl = match_note_table[1];
		var match_note_detaille = tabl.match(expr_note_detaille);
		if(match_note_detaille != null)
		{
			if(match_note_detaille.length == 9)
			{
				tempo.note_detaille.environnement= parseFloat(match_note_detaille[0].replace(",", "."));
				tempo.note_detaille.transports= parseFloat(match_note_detaille[1].replace(",", "."));
				tempo.note_detaille.securite= parseFloat(match_note_detaille[2].replace(",", "."));
				tempo.note_detaille.sante= parseFloat(match_note_detaille[3].replace(",", "."));
				tempo.note_detaille.loisirs= parseFloat(match_note_detaille[4].replace(",", "."));
				tempo.note_detaille.culture= parseFloat(match_note_detaille[5].replace(",", "."));
				tempo.note_detaille.enseignement= parseFloat(match_note_detaille[6].replace(",", "."));
				tempo.note_detaille.commerces= parseFloat(match_note_detaille[7].replace(",", "."));
				tempo.note_detaille.qualitedevie= parseFloat(match_note_detaille[8].replace(",", "."));
			}			
		}
	}

	var match_nb_commentaire = expr_nb_commentaire.exec(fichier);
	if(match_nb_commentaire != null)
	{
		tempo.nb_avis = match_nb_commentaire[1];
	}
	
	console.log(tempo);
}