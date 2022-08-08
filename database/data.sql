/**************************************************************
INF3710 - data.sql
	Charles De Lafontaine 
	Geneviève Pelletier-Mc Duff 
	Thierry Beaulieu
**************************************************************/

SET search_path = jardinCommMR;

INSERT INTO jardinCommMR.Semencier (nom, siteweb)
VALUES ('Récolte sauvage',
		'https://recoltesauvage.com/');
		
INSERT INTO jardinCommMR.Semencier (nom, siteweb)
VALUES ('Jardin de julie',
		'jardindejulie.com');

INSERT INTO jardinCommMR.Jardin (ID, nom, surface, bPotager, typeSol, bOrnement, bVerger, hauteurMaximale)
VALUES (10001,
		'Le beau Potager',
		30000.00,
		TRUE,
		'argileux',
		FALSE,
		FALSE,
		NULL);

INSERT INTO jardinCommMR.Jardin (ID, nom, surface, bPotager, typeSol, bOrnement, bVerger, hauteurMaximale)
VALUES (10002,
		'Jardin ornementé',
		800.00,
		FALSE,
		NULL,
		TRUE,
		FALSE,
		NULL);

INSERT INTO jardinCommMR.Jardin (ID, nom, surface, bPotager, typeSol, bOrnement, bVerger, hauteurMaximale)
VALUES (10003,
		'Jardin verger',
		1000.00,
		FALSE,
		NULL,
		FALSE,
		TRUE,
		10.00);

INSERT INTO jardinCommMR.Variete (nom, anneeMiseEnMarche, description, periodeMiseEnPlace, periodeRecolte, commentaireGeneral)
VALUES ('Rosabelle',
		'2002-01-27',
		ROW('Il faut planter une patates pour produires plus de patates.',
			'Il faut arroser les patates tous les trois jours.',
			'Il suffit de déraciner les patates.'
		   )::DESCRIPTIONVARIETE_T,
		'10/06/22 au 20/06/22',
		'01/04/22 au 31/04/22',
		'Utilisez optionne llement une tige de métal comme support.');
		
INSERT INTO jardinCommMR.Variete (nom, anneeMiseEnMarche, description, periodeMiseEnPlace, periodeRecolte, commentaireGeneral)
VALUES ('Trèfle vert d''Alexandrie',
		'1870-04-10',
		ROW('Il faut semer les graines.',
			'Il faut arroser les graines 2 à trois fois par jour.',
			'Il faut utiliser des outils spéciaux pour extraire les trèfles sans les endommager.'
			)::DESCRIPTIONVARIETE_T,
		'10/06/22 au 01/09/22',
		'01/09/22 au 20/10/22',
		'Ne pas exposer à la lumière du soleil directement.');
		
INSERT INTO jardinCommMR.Variete (nom, anneeMiseEnMarche, description, periodeMiseEnPlace, periodeRecolte, commentaireGeneral)
VALUES ('Nantaise 2',
		'1564-08-09',
		ROW('Planter la racine du légume.',
			'Il faut arroser les racines une fois par jour.',
			'Tirer sur la racine'
			)::DESCRIPTIONVARIETE_T,
		'10/06/22 au 01/09/22',
		'01/09/22 au 20/10/22',
		'Les carottes adorent le soleil');

INSERT INTO jardinCommMR.Variete (nom, anneeMiseEnMarche, description, periodeMiseEnPlace, periodeRecolte, commentaireGeneral)
VALUES ('Adiantum6',
		'1304-07-09',
		ROW('Il faut semer les graines.',
			'Il faut arroser les graines 2 à trois fois par jour.',
			'Il faut utiliser des outils spéciaux pour extraire les trèfles sans les endommager.'
			)::DESCRIPTIONVARIETE_T,
		'10/05/22 au 01/08/22',
		'01/09/22 au 15/10/22',
		'Exposer à la lumière du soleil directement.');
		
		
INSERT INTO jardinCommMR.Variete (nom, anneeMiseEnMarche, description, periodeMiseEnPlace, periodeRecolte, commentaireGeneral)
VALUES ('Tuberosum',
		'1404-02-01',
		ROW('Planter la racine du légume.',
			'Il faut arroser les racines une fois par jour.',
			'Tirer sur la racine'
			)::DESCRIPTIONVARIETE_T,
		'10/05/22 au 01/08/22',
		'01/09/22 au 15/10/22',
		'Les pommes de terres aiment le soleil');
	
INSERT INTO jardinCommMR.Production (nomVariete, nomSemencier, produitBio)
VALUES ('Trèfle vert d''Alexandrie',
		'Récolte sauvage',
		TRUE);

INSERT INTO jardinCommMR.Production (nomVariete, nomSemencier, produitBio)
VALUES ('Rosabelle',
		'Récolte sauvage',
		TRUE);

INSERT INTO jardinCommMR.Production (nomVariete, nomSemencier, produitBio)
VALUES ('Nantaise 2',
		'Jardin de julie',
		FALSE);

INSERT INTO jardinCommMR.Plante (nomLatin, nom, categorie, typePlante, sousTypePlante, nomVariete)
VALUES ('Lycopersicon tuberosum (L.)',
		'Patate rouge',
		'Légume',
		'Pomme de terre',
		'Solanoideae',
		'Rosabelle');
		
INSERT INTO jardinCommMR.Plante (nomLatin, nom, categorie, typePlante, sousTypePlante, nomVariete)
VALUES ('Daucus carota (L.)',
		'Carotte nantaise',
		'Légume',
		'Pomme de terre',
		'Apiacease',
		'Nantaise 2');
		
INSERT INTO jardinCommMR.Plante (nomLatin, nom, categorie, typePlante, sousTypePlante, nomVariete)
VALUES ('Trifolium alpestre (L.)',
		'Trèfle vert',
		'Légumineuses',
		'Trèfle',
		'Faboideae',
		'Trèfle vert d''Alexandrie');
		
-- Plante 1 de la variété tuberosum
INSERT INTO jardinCommMR.Plante (nomLatin, nom, categorie, typePlante, sousTypePlante, nomVariete)
VALUES ('Solanum tuberosum (L.)',
		'Russet',
		'Légume',
		'Pomme de terre',
		'Solanaceae',
		'Tuberosum');

-- Plante 2 de la variété tuberosum
INSERT INTO jardinCommMR.Plante (nomLatin, nom, categorie, typePlante, sousTypePlante, nomVariete)
VALUES ('Allium schoenoprasum (L.)',
		'Ciboulette',
		'Légumineuse',
		'Plante',
		'Plantae',
		'Tuberosum');

-- Plante fougère
INSERT INTO jardinCommMR.Plante (nomLatin, nom, categorie, typePlante, sousTypePlante, nomVariete)
VALUES ('Filicophyta (L.)',
		'Fougère',
		'Herbe',
		'Plante',
		'Plantae',
		'Adiantum6');
		
INSERT INTO jardinCommMR.AgencementPlante (nomPlante1, nomPlante2, caracteristiqueAgencement)
VALUES ('Trifolium alpestre (L.)',
		'Lycopersicon tuberosum (L.)',
		'Bénifique aux deux croissances');
		
INSERT INTO jardinCommMR.AdaptationTypeSolVariete (adaptationTypeSol, nomVariete)
VALUES ('sols argileux',
		'Rosabelle');

INSERT INTO jardinCommMR.AdaptationTypeSolVariete (adaptationTypeSol, nomVariete)
VALUES ('sols sableux',
		'Rosabelle');

INSERT INTO jardinCommMR.AdaptationTypeSolVariete (adaptationTypeSol, nomVariete)
VALUES ('sols acides ',
		'Rosabelle');

INSERT INTO jardinCommMR.AdaptationTypeSolVariete (adaptationTypeSol, nomVariete)
VALUES ('sols argileux',
		'Trèfle vert d''Alexandrie');

INSERT INTO jardinCommMR.AdaptationTypeSolVariete (adaptationTypeSol, nomVariete)
VALUES ('sols sableux',
		'Trèfle vert d''Alexandrie');
		
-- parcelle 1, jardin 2
INSERT INTO jardinCommMR.Parcelle (IDJardin, dimensions, coordonnees)
VALUES (10002,
		ROW(200.00, 3000.00, 800.00)::DIMENSIONS_T,
		ROW('45.607787', '-73.606462')::COORDONNEES_T);
		
-- parcelle 1, jardin 1
INSERT INTO jardinCommMR.Parcelle (IDJardin, dimensions, coordonnees)
VALUES (10001,
		ROW(200.00, 3000.00, 800.00)::DIMENSIONS_T,
		ROW('45.507787', '-73.596462')::COORDONNEES_T);

-- parcelle 2, jardin 1
INSERT INTO jardinCommMR.Parcelle (IDJardin, dimensions, coordonnees)
VALUES (10001,
		ROW(300.00, 4000.00, 800.00)::DIMENSIONS_T,
		ROW('45.507800', '-73.596500')::COORDONNEES_T);

-- parcelle 3, jardin 1
INSERT INTO jardinCommMR.Parcelle (IDJardin, dimensions, coordonnees)
VALUES (10001,
		ROW(300.00, 4000.00, 800.00)::DIMENSIONS_T,
		ROW('45.507800', '-73.596600')::COORDONNEES_T);

-- parcelle 4, jardin 1
INSERT INTO jardinCommMR.Parcelle (IDJardin, dimensions, coordonnees)
VALUES (10001,
		ROW(300.00, 4000.00, 800.00)::DIMENSIONS_T,
		ROW('45.507800', '-73.596700')::COORDONNEES_T);

-- rang1, parcelle 1, jardin 2
INSERT INTO jardinCommMR.Rang (IDJardin, numero, coordonneesParcelle, coordonneesRang, dateDebutJachere, dateFinJachere)
VALUES (10002,
		1,
		ROW('45.607787', '-73.606462')::COORDONNEES_T,
		ROW('45.507234', '-73.596254')::COORDONNEES_T,
		'2022-03-10',
		'2022-10-10');

-- rang1, parcelle 1, jardin 1
INSERT INTO jardinCommMR.Rang (IDJardin, numero, coordonneesParcelle, coordonneesRang, dateDebutJachere, dateFinJachere)
VALUES (10001,
		1,
		ROW('45.507787', '-73.596462')::COORDONNEES_T,
		ROW('45.507234', '-73.596143')::COORDONNEES_T,
		'2022-03-10',
		'2022-10-10');
		
-- rang2, parcelle 1, jardin 1
INSERT INTO jardinCommMR.Rang (IDJardin, numero, coordonneesParcelle, coordonneesRang, dateDebutJachere, dateFinJachere)
VALUES (10001,
		2,
		ROW('45.507787', '-73.596462')::COORDONNEES_T,
		ROW('45.507123', '-73.596423')::COORDONNEES_T,
		'2022-05-10',
		'2022-10-10');
		
-- rang3, parcelle 1, jardin 1
INSERT INTO jardinCommMR.Rang (IDJardin, numero, coordonneesParcelle, coordonneesRang, dateDebutJachere, dateFinJachere)
VALUES (10001,
		3,
		ROW('45.507787', '-73.596462')::COORDONNEES_T,
		ROW('45.507787', '-73.596462')::COORDONNEES_T,
		'2022-05-10',
		'2022-10-10');

-- rang1, parcelle 2, jardin 1
INSERT INTO jardinCommMR.Rang (IDJardin, numero, coordonneesParcelle, coordonneesRang, dateDebutJachere, dateFinJachere)
VALUES (10001,
		1,
		ROW('45.507800', '-73.596500')::COORDONNEES_T,
		ROW('45.507809', '-73.596505')::COORDONNEES_T,
		'2022-05-10',
		'2022-10-10');
		
-- rang1, parcelle 3, jardin 1
INSERT INTO jardinCommMR.Rang (IDJardin, numero, coordonneesParcelle, coordonneesRang, dateDebutJachere, dateFinJachere)
VALUES (10001,
		1,
		ROW('45.507800', '-73.596600')::COORDONNEES_T,
		ROW('45.507809', '-73.596610')::COORDONNEES_T,
		'2022-05-10',
		'2022-10-10');

-- rang1, parcelle 4, jardin 1
INSERT INTO jardinCommMR.Rang (IDJardin, numero, coordonneesParcelle, coordonneesRang, dateDebutJachere, dateFinJachere)
VALUES (10001,
		1,
		ROW('45.507800', '-73.596700')::COORDONNEES_T,
		ROW('45.507809', '-73.596710')::COORDONNEES_T,
		'2022-05-10',
		'2022-10-10');
		
-- rang2, parcelle 4, jardin 1
INSERT INTO jardinCommMR.Rang (IDJardin, numero, coordonneesParcelle, coordonneesRang, dateDebutJachere, dateFinJachere)
VALUES (10001,
		2,
		ROW('45.507800', '-73.596700')::COORDONNEES_T,
		ROW('45.507809', '-73.596710')::COORDONNEES_T,
		'2022-05-10',
		'2022-10-10');

INSERT INTO jardinCommMR.PlanteContenuJardin (nomPlante, IDJardin)
VALUES ('Trifolium alpestre (L.)', 10001);

INSERT INTO jardinCommMR.PlanteContenuJardin (nomPlante, IDJardin)
VALUES ('Lycopersicon tuberosum (L.)', 10001);

INSERT INTO jardinCommMR.PlanteContenuJardin (nomPlante, IDJardin)
VALUES ('Daucus carota (L.)', 10001);

-- rang1, parcelle 1, jardin 1
INSERT INTO jardinCommMR.VarieteContenuDansUnRang (nomVariete, numero, coordonneesParcelle, coordonneesRang, typeMiseEnPlace)
VALUES ('Nantaise 2',
		1,
		ROW('45.507787', '-73.596462')::COORDONNEES_T,
		ROW('45.507234', '-73.596143')::COORDONNEES_T,
		'En rangés');

-- rang1, parcelle 1, jardin 1 - probleme
INSERT INTO jardinCommMR.VarieteContenuDansUnRang (nomVariete, numero, coordonneesParcelle, coordonneesRang, typeMiseEnPlace)
VALUES ('Trèfle vert d''Alexandrie',
		1,
		ROW('45.507787', '-73.596462')::COORDONNEES_T,
		ROW('45.507234', '-73.596143')::COORDONNEES_T,
		'semis');
		
-- rang 2, parcelle 1, jardin 1 -- probleme
INSERT INTO jardinCommMR.VarieteContenuDansUnRang (nomVariete, numero, coordonneesParcelle, coordonneesRang, typeMiseEnPlace)
VALUES ('Rosabelle',
		2,
		ROW('45.507787', '-73.596462')::COORDONNEES_T,
		ROW('45.507123', '-73.596423')::COORDONNEES_T,
		'Enfouicement des graines');
		
-- rang 1, parcelle 2, jardin 1 -- probleme
INSERT INTO jardinCommMR.VarieteContenuDansUnRang (nomVariete, numero, coordonneesParcelle, coordonneesRang, typeMiseEnPlace)
VALUES ('Rosabelle',
		1,
		ROW('45.507800', '-73.596500')::COORDONNEES_T,
		ROW('45.507809', '-73.596505')::COORDONNEES_T,
		'Enfouicement des graines');
		
-- rang 1, parcelle 2, jardin 1 - probleme
INSERT INTO jardinCommMR.VarieteContenuDansUnRang (nomVariete, numero, coordonneesParcelle, coordonneesRang, typeMiseEnPlace)
VALUES ('Trèfle vert d''Alexandrie',
		1,
		ROW('45.507800', '-73.596500')::COORDONNEES_T,
		ROW('45.507809', '-73.596505')::COORDONNEES_T,
		'semis');
		
-- rang 1, parcelle 3, jardin 1 - probleme
INSERT INTO jardinCommMR.VarieteContenuDansUnRang (nomVariete, numero, coordonneesParcelle, coordonneesRang, typeMiseEnPlace)
VALUES ('Rosabelle',
		1,
		ROW('45.507800', '-73.596600')::COORDONNEES_T,
		ROW('45.507809', '-73.596610')::COORDONNEES_T,
		'semis');
		
-- rang 1, parcelle 4, jardin 1 - probleme
INSERT INTO jardinCommMR.VarieteContenuDansUnRang (nomVariete, numero, coordonneesParcelle, coordonneesRang, typeMiseEnPlace)
VALUES ('Rosabelle',
		1,
		ROW('45.507800', '-73.596700')::COORDONNEES_T,
		ROW('45.507809', '-73.596710')::COORDONNEES_T,
		'semis');
			
INSERT INTO jardinCommMR.Menace (typeMenace, description)
VALUES ('Chenille',
		'Les chenilles doivent manger divers éléments présents dans le jardin dans le but de se transformer en papillon.');

INSERT INTO jardinCommMR.Menace (typeMenace, description)
VALUES ('Coccinelle',
		'Danger pour la biodiversité.');
		
INSERT INTO jardinCommMR.Menace (typeMenace, description)
VALUES ('Rongeurs',
		'Les rongeurs vont déterrer les racines et manger la plante.');

INSERT INTO jardinCommMR.MenaceSubit(nomPlante, typeMenace)
VALUES ('Daucus carota (L.)', 'Rongeurs');

INSERT INTO jardinCommMR.MenaceSubit(nomPlante, typeMenace)
VALUES ('Trifolium alpestre (L.)', 'Coccinelle');

INSERT INTO jardinCommMR.MenaceSubit(nomPlante, typeMenace)
VALUES ('Trifolium alpestre (L.)', 'Chenille');

INSERT INTO jardinCommMR.MenaceSubit(nomPlante, typeMenace)
VALUES ('Lycopersicon tuberosum (L.)', 'Rongeurs');

INSERT INTO jardinCommMR.MenaceSubit(nomPlante, typeMenace)
VALUES ('Filicophyta (L.)', 'Coccinelle');

INSERT INTO jardinCommMR.MenaceSubit(nomPlante, typeMenace)
VALUES ('Filicophyta (L.)', 'Chenille');

INSERT INTO jardinCommMR.SolutionPossibleMenace (solution, typeMenace)
VALUES ('Pour éviter de faire l''utilisation de Bacillus thuringiensis; un insecticide biologique pour chenilles.',
		'Chenille');

INSERT INTO jardinCommMR.SolutionPossibleMenace (solution, typeMenace)
VALUES ('Il faut utiliser des trappes.',
		'Rongeurs');


