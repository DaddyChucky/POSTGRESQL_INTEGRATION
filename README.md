# POSTGRESQL_INTEGRATION

## [FR] Description:

- Application Web avec Angular qui intègre PostgreSQL.
- Dans le cadre du cours INF3710 (base de données) @ Polytechnique Montréal.

## [EN] Description:

- Angular web app integrating PostgreSQL.
- For INF3710 (database course) @ Polytechnique Montréal.

## Auteurs / Authors:
- Charles De Lafontaine
- Geneviève Pelletier-Mc Duff
- Thierry Beaulieu

## [FR] Contributions:
- **Charles De Lafontaine:** créateur de l'application web (front-end + backend), créateur du schéma de la base de données
- **Geneviève Pelletier-Mc Duff:** codage par les pairs, revue du code, du schéma et de la population de la BD
- **Thierry Beaulieu:** revue du schéma et de la population de la BD

## [EN] Contributions:
- **Charles De Lafontaine:** creator of the web application (front-end + backend), creator of the database schema
- **Geneviève Pelletier-Mc Duff:** peer coding, review of the code, schema, and DB population
- **Thierry Beaulieu:** review of the schema, and DB population

## [FR] Pour utiliser l'application...
- Assurez-vous d'avoir installé PostgreSQL (la version ~8.2 est utilisée pour ce projet).
- Assurez-vous d'avoir installé Node (la version ^16 est utilisée pour ce projet).
- Allez dans `/client` et lancez la commande `npm install` dans un terminal.
- Allez dans `/server` et lancez la commande `npm install` dans un terminal.
- Allez dans `/server/app/services/database.service.ts` et modifiez `connectionConfig` avec les bons paramètres de votre BD.
- Allez dans `/server` et faites la commande `npm start` dans un terminal. Le serveur est lancé au `localhost:3000` par défaut.
- Allez dans `/client` et faites la commande `npm start` dans un terminal. Le client est lancé au `localhost:4200` par défaut.

## [EN] To use this app...
- Be sure to have PostgreSQL installed (version ~8.2 is used for this project).
- Be sure to have Node installed (version ^16 is used for this project).
- Go to `/client` and type `npm install` in a terminal.
- Go to `/server` and type `npm install` in a terminal.
- Go to `/server/app/services/database.service.ts`, and modify `connectionConfig` with your database settings.
- Go to `/server` and type `npm start` in a terminal. Server is active on `localhost:3000` by default.
- Go to `/client` and type `npm start` in a terminal. Client is active on `localhost:4200` by default.
