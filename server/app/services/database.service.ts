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
      descriptions[0],
      descriptions[1],
      descriptions[2],
      variete.periodemiseenplace,
      variete.perioderecolte,
      variete.commentairegeneral,
    ];
    const queryText: string = `INSERT INTO jardinCommMR.Variete (nom, anneeMiseEnMarche, description, periodeMiseEnPlace, periodeRecolte, commentaireGeneral) VALUES($1, $2, ROW($3, $4, $5), $6, $7, $8);`;
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
      descriptions[0],
      descriptions[1],
      descriptions[2],
      variete.periodemiseenplace,
      variete.perioderecolte,
      variete.commentairegeneral,
      variete.oldvarietename
    ];
    const queryText: string = `UPDATE jardinCommMR.Variete SET nom = $1, anneeMiseEnMarche = $2, description = ROW($3, $4, $5), periodeMiseEnPlace = $6, periodeRecolte = $7, commentaireGeneral = $8 WHERE nom = $9;`;
    const res = await client.query(queryText, values);
    client.release()
    return res;
  }

  public async deleteVariete(nomVariete: string): Promise<pg.QueryResult> {
    const client = await this.pool.connect();
    if (!nomVariete) {
      throw new Error("Impossible de supprimer la variété désirée.");
    }
    const values: (string)[] = [
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
    const queryText: string = `INSERT INTO jardinCommMR.AdaptationTypeSolVariete (adaptationTypeSol, nomVariete) VALUES($1, $2);`;
    const res = await client.query(queryText, values);
    client.release()
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
      production.nomsemencier,
      production.nomvariete,
      production.produitbio
    ];
    const queryText: string = `INSERT INTO jardinCommMR.Production (nomVariete, nomSemencier, produitBio) VALUES($1, $2, $3);`;
    const res = await client.query(queryText, values);
    client.release()
    return res;
  }


  // // get hotels that correspond to certain caracteristics
  // public async filterHotels(hotelNb: string, hotelName: string, city: string): Promise<pg.QueryResult> {
  //   const client = await this.pool.connect();

  //   const searchTerms: string[] = [];
  //   if (hotelNb.length > 0) searchTerms.push(`hotelNb = '${hotelNb}'`);
  //   if (hotelName.length > 0) searchTerms.push(`name = '${hotelName}'`);
  //   if (city.length > 0) searchTerms.push(`city = '${city}'`);

  //   let queryText = "SELECT * FROM HOTELDB.Hotel";
  //   if (searchTerms.length > 0) queryText += " WHERE " + searchTerms.join(" AND ");
  //   queryText += ";";

  //   const res = await client.query(queryText);
  //   client.release()
  //   return res;
  // }


  // // get the hotel names and numbers so so that the user can only select an existing hotel
  // public async getHotelNamesByNos(): Promise<pg.QueryResult> {
  //   const client = await this.pool.connect();
  //   const res = await client.query("SELECT hotelNb, name FROM HOTELDB.Hotel;");
  //   client.release()
  //   return res;
  // }


  // // modify name or city of a hotel
  // public async updateHotel(hotel: Hotel): Promise<pg.QueryResult> {
  //   const client = await this.pool.connect();

  //   let toUpdateValues = [];
  
  //   if (hotel.name.length > 0) toUpdateValues.push(`name = '${hotel.name}'`);
  //   if (hotel.city.length > 0) toUpdateValues.push(`city = '${hotel.city}'`);

  //   if (!hotel.hotelnb || hotel.hotelnb.length === 0 || toUpdateValues.length === 0)
  //     throw new Error("Invalid hotel update query");

  //   const query = `UPDATE HOTELDB.Hotel SET ${toUpdateValues.join(", ")} WHERE hotelNb = '${hotel.hotelnb}';`;
  //   const res = await client.query(query);
  //   client.release()
  //   return res;
  // }


  // public async deleteHotel(hotelNb: string): Promise<pg.QueryResult> {
  //   if (hotelNb.length === 0) throw new Error("Invalid delete query");
    
    
  //   const client = await this.pool.connect();
  //   const query = `DELETE FROM HOTELDB.Hotel WHERE hotelNb = '${hotelNb}';`;

  //   const res = await client.query(query);
  //   client.release()
  //   return res;
  // }


  // public async filterRooms(
  //   hotelNb: string,
  //   roomNb: string = "",
  //   roomType: string = "",
  //   price: number = -1
  //   ): Promise<pg.QueryResult> {
  //   const client = await this.pool.connect();

  //   if (!hotelNb || hotelNb.length === 0) throw new Error("Invalid filterRooms request");
    
  //   let searchTerms = [];
  //   searchTerms.push(`hotelNb = '${hotelNb}'`);

  //   if (roomNb.length > 0) searchTerms.push(`hotelNb = '${hotelNb}'`);
  //   if (roomType.length > 0) searchTerms.push(`type = '${roomType}'`);
  //   if (price >= 0) searchTerms.push(`price = ${price}`);

  //   let queryText = `SELECT * FROM HOTELDB.Room WHERE ${searchTerms.join(" AND ")};`;
  //   const res = await client.query(queryText);
  //   client.release()
  //   return res;
  // }


  // public async updateRoom(room: Room): Promise<pg.QueryResult> {
  //   const client = await this.pool.connect();

  //   let toUpdateValues = [];
  //   if (room.price >= 0) toUpdateValues.push(`price = ${room.price}`);
  //   if (room.type.length > 0)
  //     toUpdateValues.push(`type = '${room.type}'`);

  //   if (!room.hotelnb ||
  //     room.hotelnb.length === 0 ||
  //     !room.roomnb ||
  //     room.roomnb.length === 0 ||
  //     toUpdateValues.length === 0
  //   ) throw new Error("Invalid room update query");

  //   const query = `UPDATE HOTELDB.Room SET ${toUpdateValues.join(
  //   ", "
  //   )} WHERE hotelNb = '${room.hotelnb}' AND roomNb = '${room.roomnb}';`;
  //   const res = await client.query(query);
  //   client.release()
  //   return res;
  // }


  // public async deleteRoom(hotelNb: string, roomNb: string): Promise<pg.QueryResult> {
  //   if (hotelNb.length === 0) throw new Error("Invalid room delete query");
  //   const client = await this.pool.connect();

  //   const query = `DELETE FROM HOTELDB.Room WHERE hotelNb = '${hotelNb}' AND roomNb = '${roomNb}';`;
  //   const res = await client.query(query);
  //   client.release()
  //   return res;
  // }


  // // ======= GUEST =======
  // public async createGuest(guest: Guest): Promise<pg.QueryResult> {
  //   const client = await this.pool.connect();
  //   if (
  //     !guest.guestnb ||
  //     !guest.nas ||
  //     !guest.name ||
  //     !guest.gender ||
  //     !guest.city
  //   ) throw new Error("Invalid create room values");

  //   if (!(guest.gender in Gender)) throw new Error("Unknown guest gender passed");

  //   const values: string[] = [
  //     guest.guestnb,
  //     guest.nas,
  //     guest.name,
  //     guest.gender,
  //     guest.city,
  //   ];
  //   const queryText: string = `INSERT INTO HOTELDB.Guest VALUES($1, $2, $3, $4, $5);`;
  //   const res = await client.query(queryText, values);
  //   client.release()
  //   return res;
  // }


  // public async getGuests(hotelNb: string, roomNb: string): Promise<pg.QueryResult> {
  //   if (!hotelNb || hotelNb.length === 0) throw new Error("Invalid guest hotel no");
    
  //   const client = await this.pool.connect();
  //   const queryExtension = roomNb ? ` AND b.roomNb = '${roomNb}'` : "";
  //   const query: string = `SELECT * FROM HOTELDB.Guest g JOIN HOTELDB.Booking b ON b.guestNb = g.guestNb WHERE b.hotelNb = '${hotelNb}'${queryExtension};`;

  //   const res = await client.query(query);
  //   client.release()
  //   return res;
  // }

  // // ======= BOOKING =======
  // public async createBooking(
  //   hotelNb: string,
  //   guestNo: string,
  //   dateFrom: Date,
  //   dateTo: Date,
  //   roomNb: string
  // ): Promise<pg.QueryResult> {
  //   const client = await this.pool.connect();
  //   const values: string[] = [
  //     hotelNb,
  //     guestNo,
  //     dateFrom.toString(),
  //     dateTo.toString(),
  //     roomNb,
  //   ];
  //   const queryText: string = `INSERT INTO HOTELDB.ROOM VALUES($1,$2,$3,$4,$5);`;

  //   const res = await client.query(queryText, values);
  //   client.release()
  //   return res;
  // }
}
