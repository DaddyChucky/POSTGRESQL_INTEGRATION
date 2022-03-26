/**************************************************************
INF3710 - TP4 (Groupe 1) - data.sql
	2076524 – Charles De Lafontaine 
	2088742 – Geneviève Pelletier-Mc Duff 
	2014211 – Thierry Beaulieu
**************************************************************/

-- nomVariete plante A
-- nomVariete plante B
-- plante fougères (nom)
-- nomVariete tuberosum

SET search_path = jardinCommMR;

INSERT INTO jardinCommMR.Semencier (nom, siteweb)
VALUES ('Récolte sauvage',
		'https://recoltesauvage.com/');

INSERT INTO jardinCommMR.Menace (typeMenace, description)
VALUES ('Chenille',
		'Les chenilles doivent manger divers éléments présents dans le jardin dans le but de se transformer en papillon.');

INSERT INTO jardinCommMR.Jardin (ID, nom, surface, bPotager, typeSol, bOrnement, bVerger, hauteurMaximale)
VALUES (10001, 'Jardin de patates', 30000.00, TRUE, 'argileux', FALSE, FALSE, NULL);

INSERT INTO jardinCommMR.Jardin (ID, nom, surface, bPotager, typeSol, bOrnement, bVerger, hauteurMaximale)
VALUES (10002, 'Jardin ornementé', 800.00, FALSE, NULL, TRUE, FALSE, NULL);

INSERT INTO jardinCommMR.Jardin (ID, nom, surface, bPotager, typeSol, bOrnement, bVerger, hauteurMaximale)
VALUES (10003, 'Jardin verger', 1000.00, FALSE, NULL, FALSE, TRUE, 10.00);

INSERT INTO jardinCommMR.Variete (nom, anneeMiseEnMarche, descriptionPlantation, descriptionEntretien, descriptionRecolte, periodeMiseEnPlace, periodeRecolte, commentaireGeneral)
VALUES ('Rosabelle',
		'2002-01-27',
		'Il faut planter une patates pour produires plus de patates.',
		'Il faut arroser les patates tous les trois jours.',
		'Il suffit de déraciner les patates.',
		'Entre le 10 juin et le 20 juin',
		'Entre le 1 et le 31 août',
		'Utilisez optionnellement une tige de métal comme support.');
		
INSERT INTO jardinCommMR.Variete (nom, anneeMiseEnMarche, descriptionPlantation, descriptionEntretien, descriptionRecolte, periodeMiseEnPlace, periodeRecolte, commentaireGeneral)
VALUES ('trèfle vert d''Alexandrie',
		'1870-04-10',
		'Il faut semer les graines.',
		'Il faut arroser les graines 2 à trois fois par jour.',
		'Il faut utiliser des outils spéciaux pour extraire les trèfles sans les endommager.',
		'Entre le 10 juin et le 1 septembre',
		'10 jours après le semis',
		'Ne pas exposer à la lumière du soleil directement.');
		
INSERT INTO jardinCommMR.Production (nomVariete, nomSemencier, produitVersionBio, produitVersionNonBio)
VALUES ('trèfle vert d''Alexandrie', 'Récolte sauvage', FALSE, TRUE);

INSERT INTO jardinCommMR.Production (nomVariete, nomSemencier, produitVersionBio, produitVersionNonBio)
VALUES ('Rosabelle', 'Récolte sauvage', TRUE, FALSE);

INSERT INTO jardinCommMR.SolutionPossibleMenace (solution, typeMenace)
VALUES ('Pour éviter de faire l''utilisation de Bacillus thuringiensis; un insecticide biologique pour chenilles.',
		'Chenille');

INSERT INTO jardinCommMR.Plante (nomLatin, nom, categorie, typePlante, sousTypePlante, nomVariete)
VALUES ('Lycopersicon tuberosum (L.)',
		'patate rouge',
		'pomme de terre',
		'Solanaceae',
		'Solanoideae',
		'Rosabelle');
		
INSERT INTO jardinCommMR.Plante (nomLatin, nom, categorie, typePlante, sousTypePlante, nomVariete)
VALUES ('Trifolium alpestre (L.)',
		'trèfle vert',
		'Légumineuses',
		'Fabaceae',
		'Faboideae',
		'trèfle vert d''Alexandrie');
		
INSERT INTO jardinCommMR.AdaptationTypeSolVariete (adaptationTypeSol, nomVariete)
VALUES ('sols argileux', 'Rosabelle');

INSERT INTO jardinCommMR.AdaptationTypeSolVariete (adaptationTypeSol, nomVariete)
VALUES ('sols sableux', 'Rosabelle');

INSERT INTO jardinCommMR.AdaptationTypeSolVariete (adaptationTypeSol, nomVariete)
VALUES ('sols acides ', 'Rosabelle');

INSERT INTO jardinCommMR.AdaptationTypeSolVariete (adaptationTypeSol, nomVariete)
VALUES ('sols argileux', 'trèfle vert d''Alexandrie');

INSERT INTO jardinCommMR.AdaptationTypeSolVariete (adaptationTypeSol, nomVariete)
VALUES ('sols sableux', 'trèfle vert d''Alexandrie');

INSERT INTO jardinCommMR.Parcelle (IDJardin, dimensions, coordonnees)
VALUES (10001, ROW(200.00, 3000.00, 800.00)::DIMENSIONS_T, ROW('45.507787', '-73.596462')::COORDONNEES_T);

INSERT INTO jardinCommMR.AgencementPlante (nomPlante1, nomPlante2, caracteristiqueAgencement)
VALUES ('Trifolium alpestre (L.)',
		'Lycopersicon tuberosum (L.)',
		'Bénifique aux deux croissances');

INSERT INTO jardinCommMR.PlanteContenuJardin (nomPlante, IDJardin)
VALUES ('Trifolium alpestre (L.)', 10002);

INSERT INTO jardinCommMR.PlanteContenuJardin (nomPlante, IDJardin)
VALUES ('Lycopersicon tuberosum (L.)', 10001);

INSERT INTO jardinCommMR.Rang (IDJardin, coordonneesParcelle, numero, coordonneesRang, dateDebutJachere, dateFinJachere)
VALUES (10001,
		ROW('45.507787', '-73.596462')::COORDONNEES_T,
		3,
		ROW('45.507787', '-73.596462')::COORDONNEES_T,
		'2022-05-10',
		'2022-10-10');
		
INSERT INTO jardinCommMR.VarieteContenuDansUnRang (nomVariete, IDJardinRang, coordonneesParcelleRang, numeroRang, typeMiseEnPlace)
VALUES ('trèfle vert d''Alexandrie', 10001, ROW('45.507787', '-73.596462')::COORDONNEES_T, 3, 'semis');









