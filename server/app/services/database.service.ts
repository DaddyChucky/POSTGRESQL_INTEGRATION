import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Production } from "../../../common/tables/Production";
import { Variete } from "../../../common/tables/Variete";
import { AdaptationTypeSolVariete } from '../../../common/tables/AdaptationTypeSolVariete';
@injectable()
export class DatabaseService {
  public connectionConfig: pg.ConnectionConfig = {
    user: "postgres",
    database: "TP4",
    password: "root",
    port: 5432,
    host: "127.0.0.1",
    keepAlive: true
  };

  public pool: pg.Pool = new pg.Pool(this.connectionConfig);


  // ======= JARDINS =======
  async getAllJardins(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM jardinCommMR.Jardin;`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  async getJardin(id: number): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM jardinCommMR.Jardin WHERE ID = ${id.toString()};`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }


  // ======= PARCELLES =======
  async getAllParcelles(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM jardinCommMR.Parcelle;`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  async getAllParcellesOfJardin(IDJardin: number): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM jardinCommMR.Parcelle WHERE IDJardin = ${IDJardin.toString()};`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }


  // ======= RANGS =======
  async getAllRangs(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM jardinCommMR.Rang;`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  async getAllRangsOfParcelle(coordsParcelle: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM jardinCommMR.Rang WHERE coordonneesparcelle = ${coordsParcelle};`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }


  // ======= VARIETES =======
  async getAllVarietesInRangs(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM jardinCommMR.VarieteContenuDansUnRang;`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  async getAllVarietesOfSpecificRang(coordonneesRang: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM jardinCommMR.VarieteContenuDansUnRang WHERE coordonneesRang = ${coordonneesRang};`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  async getAllVarietes(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM jardinCommMR.Variete;`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  async getSpecificVariete(varieteName: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM jardinCommMR.Variete WHERE nom = ${varieteName};`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  public async addVariete(variete: Variete): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const sep = "##//##";
    const descriptions: string[] = variete.description.split(sep);
    if (!variete.anneemiseenmarche.toString().length || !variete.commentairegeneral.length || descriptions.length !== 3 || !variete.nom.length || !variete.periodemiseenplace.length || !variete.perioderecolte.length) {
      throw new Error("Impossible d'ajouter la variété désirée.");
    }
    const values: (string | Date)[] = [
      variete.nom,
      variete.anneemiseenmarche,
      '("' + descriptions[0] + '","' +  descriptions[1] + '","' + descriptions[2] + '")',
      variete.periodemiseenplace,
      variete.perioderecolte,
      variete.commentairegeneral,
    ];
    const queryText: string = `INSERT INTO jardinCommMR.Variete (nom, anneeMiseEnMarche, description, periodeMiseEnPlace, periodeRecolte, commentaireGeneral) VALUES($1, $2, $3, $4, $5, $6);`;
    const res = await client.query(queryText, values);
    client.release()
    return res;
  }

  public async updateVariete(variete: Variete): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const sep = "##//##";
    const descriptions: string[] = variete.description.split(sep);
    if (!variete.oldvarietename || !variete.anneemiseenmarche.toString().length || !variete.commentairegeneral.length || descriptions.length !== 3 || !variete.nom.length || !variete.periodemiseenplace.length || !variete.perioderecolte.length) {
      throw new Error("Impossible de modifier la variété désirée.");
    }
    const values: (string | Date)[] = [
      variete.nom,
      variete.anneemiseenmarche,
      '"' + descriptions[0] + '"',
      '"' + descriptions[1] + '"',
      '"' + descriptions[2] + '"',
      variete.periodemiseenplace,
      variete.perioderecolte,
      variete.commentairegeneral,
      variete.oldvarietename
    ];
    const queryText: string = `UPDATE jardinCommMR.Variete SET nom = $1, anneeMiseEnMarche = $2, description = ROW($3, $4, $5), periodeMiseEnPlace = $6, periodeRecolte = $7, commentaireGeneral = $8 WHERE nom = $9;`;
    const res = await client.query(queryText, values);
    client.release();
    return res;
  }

  public async deleteVariete(nomVariete: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    if (!nomVariete) {
      throw new Error("Impossible de supprimer la variété désirée.");
    }
    const values: string[] = [
      nomVariete
    ];
    const queryText: string = `DELETE FROM jardinCommMR.Variete WHERE nom = $1;`;
    const res = await client.query(queryText, values);
    client.release()
    return res;
  }


  // ======= PLANTES =======
  async getAllPlantes(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM jardinCommMR.Plante;`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  async getSpecificPlante(nomLatin: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM jardinCommMR.Plante WHERE nomLatin = ${nomLatin};`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }


  // ======= SEMENCIER =======
  async getAllSemencier(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM jardinCommMR.Semencier;`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  async getSpecificSemencier(nom: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM jardinCommMR.Semencier WHERE nom = ${nom};`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }


  // ======= ADAPTATIONTYPESOLVARIETE =======
  async getAllAdaptationTypeSolVariete(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM jardinCommMR.AdaptationTypeSolVariete;`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  async getSpecificAdaptationTypeSolVariete(nomVariete: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM jardinCommMR.AdaptationTypeSolVariete WHERE nomVariete = ${nomVariete};`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  public async addAdaptation(adaptation: AdaptationTypeSolVariete): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    if (!adaptation.nomvariete || !adaptation.adaptationtypesol) {
      throw new Error("Impossible d'ajouter l'adaptation désirée.");
    }
    const values: string[] = [
      adaptation.nomvariete,
      adaptation.adaptationtypesol
    ];
    const queryText: string = `INSERT INTO jardinCommMR.AdaptationTypeSolVariete (nomVariete, adaptationTypeSol) VALUES($1, $2);`;
    const res = await client.query(queryText, values);
    client.release()
    return res;
  }

  public async updateAdaptation(adaptation: AdaptationTypeSolVariete): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    if (!adaptation.adaptationtypesol || !adaptation.nomvariete || !adaptation.oldnomvariete || adaptation.oldadaptationtypesol === undefined) {
      throw new Error("Impossible de modifier l'adaptation désirée.");
    }
    const values: string[] = [
      adaptation.nomvariete,
      adaptation.adaptationtypesol,
      adaptation.oldnomvariete,
      adaptation.oldadaptationtypesol
    ];
    const queryText: string = `UPDATE jardinCommMR.AdaptationTypeSolVariete SET nomVariete = $1, adaptationTypeSol = $2 WHERE nomVariete = $3 AND adaptationTypeSol = $4;`;
    const res = await client.query(queryText, values);
    client.release();
    return res;
  }


  // ======= PRODUCTION =======
  async getAllProduction(): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM jardinCommMR.Production;`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  async getSpecificProduction(nomVariete: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    const queryText: string = `SELECT * FROM jardinCommMR.Production WHERE nomVariete = ${nomVariete};`;
    const res = await client.query(queryText);
    client.release();
    return res;
  }

  public async addProduction(production: Production): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    if (!production.nomsemencier || !production.nomvariete) {
      throw new Error("Impossible d'ajouter la production désirée.");
    }
    const values: (string | boolean)[] = [
      production.nomvariete,
      production.nomsemencier,
      production.produitbio
    ];
    const queryText: string = `INSERT INTO jardinCommMR.Production (nomVariete, nomSemencier, produitBio) VALUES($1, $2, $3);`;
    const res = await client.query(queryText, values);
    client.release()
    return res;
  }

  public async updateProduction(production: Production): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    if (!production.nomsemencier || !production.nomvariete || !production.oldnomsemencier || !production.oldnomvariete) {
      throw new Error("Impossible de modifier la production désirée.");
    }
    const values: (string | boolean)[] = [
      production.nomvariete,
      production.nomsemencier,
      production.produitbio,
      production.oldnomvariete,
      production.oldnomsemencier,
    ];
    const queryText: string = `UPDATE jardinCommMR.Production SET nomVariete = $1, nomSemencier = $2, produitBio = $3 WHERE nomVariete = $4 AND nomSemencier = $5;`;
    const res = await client.query(queryText, values);
    client.release();
    return res;
  }
}
