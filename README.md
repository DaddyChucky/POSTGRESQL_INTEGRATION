# POSTGRESQL_INTEGRATION

- PostgreSQL link and Website development for Polytechnique Montréal.

## Auteurs:
- Charles De Lafontaine;
- Geneviève Pelletier-Mc Duff;
- Thierry Beaulieu.

## Avant de lancer l'application
- Assurez-vous d'avoir installé Postgres (la version ~8.2 est utilisée pour ce projet).
- Assurez-vous d'avoir installé Node (la version ^16 est utilisée pour ce projet).

- Allez dans `/client`  et lancez `npm install`.
- Allez dans `/server` et lancez `npm install`.

- Allez dans `/server/app/services/database.service.ts` et modifiez `connectionConfig` avec les bons paramètres de votre BD.

## Pour lancer le projet
- Allez dans `/server` et faites `npm start`. Le serveur est lancé au `localhost:3000`.
- Allez dans `/client` et faites `npm start`. Le client est lancé au `localhost:4200` par défaut.
