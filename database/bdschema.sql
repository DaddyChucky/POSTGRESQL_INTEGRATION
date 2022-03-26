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
CREATE TYPE COORDONNEES_T AS (latitude VARCHAR(50), longitude VARCHAR(50));

CREATE TABLE IF NOT EXISTS jardinCommMR.Semencier(
	nom VARCHAR(50) NOT NULL,
	siteWeb VARCHAR(50) NOT NULL,
	PRIMARY KEY (nom)
);

CREATE TABLE IF NOT EXISTS jardinCommMR.Menace(
	typeMenace VARCHAR(50) NOT NULL,
	description VARCHAR(150) NOT NULL,
	PRIMARY KEY (typeMenace)
);

CREATE TABLE IF NOT EXISTS jardinCommMR.Jardin(
	ID SMALLINT NOT NULL,
	nom VARCHAR(50) NOT NULL,
	surface NUMERIC(10, 2) NOT NULL,
	CONSTRAINT surface CHECK (surface >= 0),
	bPotager BOOLEAN NOT NULL,
	typeSol VARCHAR(50) NULL,
	bOrnement BOOLEAN NOT NULL,
	bVerger BOOLEAN NOT NULL,
	CONSTRAINT mandatory CHECK (bPotager OR bOrnement OR bVerger),
	hauteurMaximale NUMERIC(6, 2) NULL,
	CONSTRAINT hauteurMaximale CHECK (hauteurMaximale IS NULL OR hauteurMaximale > 0),
	PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS jardinCommMR.Variete(
	nom VARCHAR(50) NOT NULL,
	anneeMiseEnMarche DATE NOT NULL,
	descriptionPlantation VARCHAR(150) NOT NULL,
	descriptionEntretien VARCHAR(150) NOT NULL,
	descriptionRecolte VARCHAR(150) NOT NULL,
	periodeMiseEnPlace VARCHAR(150) NOT NULL,
	periodeRecolte VARCHAR(150) NOT NULL,
	CONSTRAINT periodes CHECK(periodeMiseEnPlace != periodeRecolte),
	commentaireGeneral VARCHAR(150) NOT NULL,
	PRIMARY KEY (nom)
);

CREATE TABLE IF NOT EXISTS jardinCommMR.Production(
	nomVariete VARCHAR(50) NOT NULL,
	nomSemencier VARCHAR(50) NOT NULL,
	produitVersionBio BOOLEAN NOT NULL,
	produitVersionNonBio BOOLEAN NOT NULL,
	CONSTRAINT production CHECK(produitVersionBio OR produitVersionNonBio),
	PRIMARY KEY (nomVariete, nomSemencier),
	FOREIGN KEY (nomVariete) REFERENCES Variete(nom) ON UPDATE CASCADE ON DELETE RESTRICT,
	FOREIGN KEY (nomSemencier) REFERENCES Semencier(nom) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS jardinCommMR.SolutionPossibleMenace(
	solution VARCHAR(150) NOT NULL,
	typeMenace VARCHAR(50) NOT NULL,
	PRIMARY KEY (solution, typeMenace),
	FOREIGN KEY (typeMenace) REFERENCES Menace(typeMenace) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS jardinCommMR.Plante(
	nomLatin VARCHAR(50) NOT NULL,
	nom VARCHAR(50) NOT NULL,
	categorie VARCHAR(50) NOT NULL,
	typePlante VARCHAR(50) NOT NULL,
	sousTypePlante VARCHAR(50) NULL,
	nomVariete VARCHAR(50),
	PRIMARY KEY (nomLatin),
	FOREIGN KEY (nomVariete) REFERENCES Variete(nom) ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS jardinCommMR.AdaptationTypeSolVariete(
	adaptationTypeSol VARCHAR(50) NOT NULL,
	nomVariete VARCHAR(50) NOT NULL,
	PRIMARY KEY (adaptationTypeSol, nomVariete),
	FOREIGN KEY (nomVariete) REFERENCES Variete(nom) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS jardinCommMR.Parcelle(
	IDJardin SMALLINT NOT NULL,
	coordonnees COORDONNEES_T UNIQUE NOT NULL,
	dimensions DIMENSIONS_T NOT NULL,
	PRIMARY KEY (IDJardin, coordonnees),
	FOREIGN KEY (IDJardin) REFERENCES Jardin(ID) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS jardinCommMR.AgencementPlante(
	nomPlante1 VARCHAR(50) NOT NULL,
	nomPlante2 VARCHAR(50) NOT NULL,
	CONSTRAINT noms CHECK(nomPlante1 != nomPlante2),
	caracteristiqueAgencement VARCHAR(50) NOT NULL,
	PRIMARY KEY (nomPlante1, nomPlante2, caracteristiqueAgencement),
	FOREIGN KEY (nomPlante1) REFERENCES Plante(nomLatin) ON UPDATE CASCADE ON DELETE RESTRICT,
	FOREIGN KEY (nomPlante2) REFERENCES Plante(nomLatin) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS jardinCommMR.PlanteContenuJardin(
	nomPlante VARCHAR(50) NOT NULL,
	IDJardin SMALLINT NOT NULL,
	PRIMARY KEY (nomPlante, IDJardin),
	FOREIGN KEY (nomPlante) REFERENCES Plante(nomLatin) ON UPDATE CASCADE ON DELETE RESTRICT,
	FOREIGN KEY (IDJardin) REFERENCES Jardin(ID) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS jardinCommMR.Rang(
	IDJardin SMALLINT UNIQUE NOT NULL,
	coordonneesParcelle COORDONNEES_T UNIQUE NOT NULL,
	numero SMALLINT UNIQUE NOT NULL,
	CONSTRAINT numero CHECK (numero >= 1),
	coordonneesRang COORDONNEES_T NOT NULL,
	dateDebutJachere DATE NULL,
	dateFinJachere DATE NULL,
	CONSTRAINT jachere CHECK (dateDebutJachere IS NULL AND dateFinJachere IS NULL OR dateFinJachere > dateDebutJachere AND DATE_PART('day', dateFinJachere::TIMESTAMP - dateDebutJachere::TIMESTAMP)::SMALLINT <= 365),
	PRIMARY KEY (IDJardin, coordonneesParcelle, numero),
	FOREIGN KEY (IDJardin) REFERENCES Jardin(ID) ON UPDATE CASCADE ON DELETE RESTRICT,
	FOREIGN KEY (coordonneesParcelle) REFERENCES Parcelle(coordonnees) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS jardinCommMR.VarieteContenuDansUnRang(
	nomVariete VARCHAR(50) NOT NULL,
	IDJardinRang SMALLINT NOT NULL,
	coordonneesParcelleRang COORDONNEES_T NOT NULL,
	numeroRang SMALLINT NOT NULL,
	CONSTRAINT numeroRang CHECK (numeroRang >= 1),
	typeMiseEnPlace VARCHAR(50) NOT NULL,
	PRIMARY KEY (nomVariete, IDJardinRang, coordonneesParcelleRang, numeroRang),
	FOREIGN KEY (nomVariete) REFERENCES Variete(nom) ON UPDATE CASCADE ON DELETE RESTRICT,
	FOREIGN KEY (IDJardinRang) REFERENCES Rang(IDJardin) ON UPDATE CASCADE ON DELETE RESTRICT,
	FOREIGN KEY (coordonneesParcelleRang) REFERENCES Rang(coordonneesParcelle) ON UPDATE CASCADE ON DELETE RESTRICT,
	FOREIGN KEY (numeroRang) REFERENCES Rang(numero) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE IF NOT EXISTS jardinCommMR.MenaceSubit(
	nomPlante VARCHAR(50) NOT NULL,
	typeMenace VARCHAR(50) NOT NULL,
	PRIMARY KEY (nomPlante, typeMenace),
	FOREIGN KEY (nomPlante) REFERENCES Plante(nomLatin) ON UPDATE CASCADE ON DELETE RESTRICT,
	FOREIGN KEY (typeMenace) REFERENCES Menace(typeMenace) ON UPDATE CASCADE ON DELETE RESTRICT
);
