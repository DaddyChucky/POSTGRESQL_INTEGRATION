/**************************************************************
INF3710 - TP4 (Groupe 1) - bdschema.sql
	2076524 – Charles De Lafontaine 
	2088742 – Geneviève Pelletier-Mc Duff 
	2014211 – Thierry Beaulieu
**************************************************************/

DROP SCHEMA IF EXISTS jardinCommMR CASCADE;
CREATE SCHEMA jardinCommMR;

SET search_path = jardinCommMR;

CREATE TYPE DIMENSIONS_T AS (x NUMERIC(10, 2), y NUMERIC(10, 2), z NUMERIC(10, 2));
CREATE TYPE COORDONNEES_T AS (latitude REAL, longitude REAL);
CREATE TYPE DESCRIPTIONVARIETE_T AS (plantation VARCHAR(300), entretien VARCHAR(300), recolte VARCHAR(300));

CREATE TABLE IF NOT EXISTS jardinCommMR.Semencier(
	nom VARCHAR(150) NOT NULL,
	siteWeb VARCHAR(150) NOT NULL,
	PRIMARY KEY (nom)
);

CREATE TABLE IF NOT EXISTS jardinCommMR.Menace(
	typeMenace VARCHAR(150) NOT NULL,
	description VARCHAR(300) NOT NULL,
	PRIMARY KEY (typeMenace)
);

CREATE TABLE IF NOT EXISTS jardinCommMR.Jardin(
	ID SMALLINT NOT NULL,
	nom VARCHAR(150) NOT NULL,
	surface NUMERIC(10, 2) NOT NULL,
	CONSTRAINT surface CHECK (surface >= 0),
	bPotager BOOLEAN NOT NULL,
	typeSol VARCHAR(150) NULL,
	CONSTRAINT typeSol CHECK (typeSol IS NULL OR bPotager),
	bOrnement BOOLEAN NOT NULL,
	bVerger BOOLEAN NOT NULL,
	CONSTRAINT mandatory CHECK (bPotager OR bOrnement OR bVerger),
	hauteurMaximale NUMERIC(6, 2) NULL,
	CONSTRAINT hauteurMaximale CHECK (hauteurMaximale IS NULL OR bVerger AND hauteurMaximale > 0),
	PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS jardinCommMR.Variete(
	nom VARCHAR(150) NOT NULL,
	anneeMiseEnMarche DATE NOT NULL,
	description DESCRIPTIONVARIETE_T NOT NULL,
	periodeMiseEnPlace VARCHAR(25) NOT NULL,
	periodeRecolte VARCHAR(25) NOT NULL,
	CONSTRAINT periodes CHECK(periodeMiseEnPlace != periodeRecolte),
	commentaireGeneral VARCHAR(300) NOT NULL,
	PRIMARY KEY (nom)
);

CREATE TABLE IF NOT EXISTS jardinCommMR.Production(
	nomVariete VARCHAR(150) NOT NULL,
	nomSemencier VARCHAR(150) NOT NULL,
	produitBio BOOLEAN NOT NULL,
	PRIMARY KEY (nomVariete, nomSemencier),
	FOREIGN KEY (nomVariete) REFERENCES Variete(nom) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (nomSemencier) REFERENCES Semencier(nom) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS jardinCommMR.SolutionPossibleMenace(
	solution VARCHAR(300) NOT NULL,
	typeMenace VARCHAR(150) NOT NULL,
	PRIMARY KEY (solution, typeMenace),
	FOREIGN KEY (typeMenace) REFERENCES Menace(typeMenace) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS jardinCommMR.Plante(
	nomLatin VARCHAR(150) NOT NULL,
	nom VARCHAR(150) NOT NULL,
	categorie VARCHAR(150) NOT NULL,
	typePlante VARCHAR(150) NOT NULL,
	sousTypePlante VARCHAR(150) NULL,
	nomVariete VARCHAR(150),
	PRIMARY KEY (nomLatin),
	FOREIGN KEY (nomVariete) REFERENCES Variete(nom) ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS jardinCommMR.AdaptationTypeSolVariete(
	adaptationTypeSol VARCHAR(150) NOT NULL,
	nomVariete VARCHAR(150) NOT NULL,
	PRIMARY KEY (adaptationTypeSol, nomVariete),
	FOREIGN KEY (nomVariete) REFERENCES Variete(nom) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS jardinCommMR.AgencementPlante(
	nomPlante1 VARCHAR(150) NOT NULL,
	nomPlante2 VARCHAR(150) NOT NULL,
	CONSTRAINT noms CHECK(nomPlante1 != nomPlante2),
	caracteristiqueAgencement VARCHAR(150) NOT NULL,
	PRIMARY KEY (nomPlante1, nomPlante2, caracteristiqueAgencement),
	FOREIGN KEY (nomPlante1) REFERENCES Plante(nomLatin) ON UPDATE CASCADE ON DELETE RESTRICT,
	FOREIGN KEY (nomPlante2) REFERENCES Plante(nomLatin) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS jardinCommMR.PlanteContenuJardin(
	nomPlante VARCHAR(150) NOT NULL,
	IDJardin SMALLINT NOT NULL,
	PRIMARY KEY (nomPlante, IDJardin),
	FOREIGN KEY (nomPlante) REFERENCES Plante(nomLatin) ON UPDATE CASCADE ON DELETE RESTRICT,
	FOREIGN KEY (IDJardin) REFERENCES Jardin(ID) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS jardinCommMR.Parcelle(
	coordonnees COORDONNEES_T NOT NULL,
	IDJardin SMALLINT NOT NULL,
	dimensions DIMENSIONS_T NOT NULL,
	PRIMARY KEY (coordonnees, IDJardin),
	FOREIGN KEY (IDJardin) REFERENCES Jardin(ID) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS jardinCommMR.Rang(
	IDJardin SMALLINT NOT NULL,
	numero SMALLINT NOT NULL,
	coordonneesRang COORDONNEES_T NOT NULL,
	CONSTRAINT numero CHECK (numero >= 1),
	coordonneesParcelle COORDONNEES_T NOT NULL,
	dateDebutJachere DATE NULL,
	dateFinJachere DATE NULL,
	CONSTRAINT jachere CHECK (dateDebutJachere IS NULL AND dateFinJachere IS NULL OR dateFinJachere > dateDebutJachere AND DATE_PART('day', dateFinJachere::TIMESTAMP - dateDebutJachere::TIMESTAMP)::SMALLINT <= 365),
	PRIMARY KEY (numero, coordonneesRang, coordonneesParcelle),
	FOREIGN KEY (coordonneesParcelle, IDJardin) REFERENCES Parcelle(coordonnees, IDJardin) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS jardinCommMR.VarieteContenuDansUnRang(
	nomVariete VARCHAR(150) NOT NULL,
	numero SMALLINT NOT NULL,
	coordonneesRang COORDONNEES_T NOT NULL,
	coordonneesParcelle COORDONNEES_T NOT NULL,
	typeMiseEnPlace VARCHAR(150) NOT NULL,
	PRIMARY KEY (nomVariete, coordonneesRang),
	FOREIGN KEY (nomVariete) REFERENCES Variete(nom) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (numero, coordonneesRang, coordonneesParcelle) REFERENCES Rang(numero, coordonneesRang, coordonneesParcelle) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS jardinCommMR.MenaceSubit(
	nomPlante VARCHAR(150) NOT NULL,
	typeMenace VARCHAR(150) NOT NULL,
	PRIMARY KEY (nomPlante, typeMenace),
	FOREIGN KEY (nomPlante) REFERENCES Plante(nomLatin) ON UPDATE CASCADE ON DELETE RESTRICT,
	FOREIGN KEY (typeMenace) REFERENCES Menace(typeMenace) ON UPDATE CASCADE ON DELETE RESTRICT
);
