//-----------------------------
// Require
//-----------------------------
var fs = require("fs");
var tools = require('../tools');
var options = require('../options.json');


//-----------------------------
// Cible
//-----------------------------
var liste_file = options.correspondance.soyez;

//-----------------------------
// Main
//-----------------------------
var convertir = function (path_passerelle)
{
	var annonces = [];

	for(var i in liste_file)
	{
		var path_file = path_passerelle+liste_file[i].fichier;
		var data = tools.open_and_parse_xml(path_file);

		if(data !== false)
		{
			for(var j in data.annonce)
			{
				var annonce = tools.default_annonce();
				annonce.reference = data.annonce[j].reference;
				annonce.description = data.annonce[j].description;
				annonce.commercial = "vente";
				annonce.type = "maison";
				annonce.prix = data.annonce[j].prix,
				annonce.dpe = data.annonce[j].dpeenergie;
				annonce.images = recherche_img(data.annonce[j]);
				annonce.agence = liste_file[i].agence;
				annonces.push(annonce);				
			}	
			console.log("Le fichier "+liste_file[i].fichier+" a été traité");		
		}
		else
		{
			console.log("Erreur : Le fichier n'existe pas");
		}
	}

	return annonces;
}

//-----------------------------
// Recherche Image
//-----------------------------
var recherche_img = function (info)
{
	var imgs = [];	

	valide_img(info.img1, imgs);
	valide_img(info.img2, imgs);
	valide_img(info.img3, imgs);
	valide_img(info.img4, imgs);
	valide_img(info.img5, imgs);
	valide_img(info.img6, imgs);
	valide_img(info.img7, imgs);
	valide_img(info.img8, imgs);
	valide_img(info.img9, imgs);
	valide_img(info.img10, imgs);

	return imgs;
}

var valide_img = function (candidat, tab)
{
	if(candidat != undefined)
	{
		var image = tools.default_img();
		image.src = candidat;
		tab.push(image);
	}
}

exports.convertir = convertir;





