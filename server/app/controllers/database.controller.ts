import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";
import { DatabaseService } from "../services/database.service";
import Types from "../types";
import { Jardin } from '../../../common/tables/Jardin';
import { Parcelle } from '../../../common/tables/Parcelle';
import { Rang } from '../../../common/tables/Rang';
import { Plante } from '../../../common/tables/Plante';
import { VarieteContenuDansUnRang } from '../../../common/tables/VarieteContenuDansUnRang';
import { Variete } from '../../../common/tables/Variete';

@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService) private databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();

    // ======= JARDINS ROUTES =======
    router.get("/jardins/:id?", (req: Request, res: Response, _: NextFunction) => {
      if(req.params.id) {
        this.databaseService
        .getJardin(req.params.id)
        .then((result: pg.QueryResult) => {
          const jardins: Jardin[] = result.rows.map((jardin: Jardin) => ({
            id: jardin.id,
            nom: jardin.nom,
            surface: jardin.surface,
            bpotager: jardin.bpotager,
            bornement: jardin.bornement,
            bverger: jardin.bverger,
            typesol: jardin.typesol,
            hauteurmaximale: jardin.hauteurmaximale,
          } as Jardin));
          res.json(jardins);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
      } else {
        this.databaseService
        .getAllJardins()
        .then((result: pg.QueryResult) => {
          const jardins: Jardin[] = result.rows.map((jardin: Jardin) => ({
            id: jardin.id,
            nom: jardin.nom,
            surface: jardin.surface,
            bpotager: jardin.bpotager,
            bornement: jardin.bornement,
            bverger: jardin.bverger,
            typesol: jardin.typesol,
            hauteurmaximale: jardin.hauteurmaximale,
          } as Jardin));
          res.json(jardins);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
      }
    });

    // ======= PARCELLES ROUTES =======
    router.get("/parcelles/:IDJardin?", (req: Request, res: Response, _: NextFunction) => {
      if(req.params.IDJardin) {
        this.databaseService
        .getAllParcellesOfJardin(req.params.IDJardin)
        .then((result: pg.QueryResult) => {
          const parcelles: Parcelle[] = result.rows.map((parcelle: Parcelle) => ({
            idjardin: parcelle.idjardin,
            coordonnees: parcelle.coordonnees,
            dimensions: parcelle.dimensions
          } as Parcelle));
          res.json(parcelles);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
      } else {
        this.databaseService
        .getAllParcelles()
        .then((result: pg.QueryResult) => {
          const parcelles: Parcelle[] = result.rows.map((parcelle: Parcelle) => ({
            idjardin: parcelle.idjardin,
            coordonnees: parcelle.coordonnees,
            dimensions: parcelle.dimensions
          } as Parcelle));
          res.json(parcelles);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
      }
    });

    // ======= RANGS ROUTES =======
    router.get("/rangs/:coordsParcelle?", (req: Request, res: Response, _: NextFunction) => {
      if(req.params.coordsParcelle) {
        this.databaseService
        .getAllRangsOfParcelle(req.params.coordsParcelle)
        .then((result: pg.QueryResult) => {
          const rangs: Rang[] = result.rows.map((rang: Rang) => ({
            coordonneesparcelle: rang.coordonneesparcelle,
            numero: rang.numero,
            coordonneesrang: rang.coordonneesrang,
            datedebutjachere: rang.datedebutjachere,
            datefinjachere: rang.datefinjachere,
          } as Rang));
          res.json(rangs);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
      } else {
        this.databaseService
        .getAllRangs()
        .then((result: pg.QueryResult) => {
          const rangs: Rang[] = result.rows.map((rang: Rang) => ({
            coordonneesparcelle: rang.coordonneesparcelle,
            numero: rang.numero,
            coordonneesrang: rang.coordonneesrang,
            datedebutjachere: rang.datedebutjachere,
            datefinjachere: rang.datefinjachere,
          } as Rang));
          res.json(rangs);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
      }
    });

  // ======= VARIETES ROUTES =======
  router.get("/varietes/:nom?", (req: Request, res: Response, _: NextFunction) => {
    if(req.params.nom) {
      this.databaseService
      .getSpecificVariete(req.params.nom)
      .then((result: pg.QueryResult) => {
        const varietes: Variete[] = result.rows.map((variete: Variete) => ({
          nom: variete.nom,
          anneemiseenmarche: variete.anneemiseenmarche,
          description: variete.description,
          periodemiseenplace: variete.periodemiseenplace,
          perioderecolte: variete.perioderecolte,
          commentairegeneral: variete.commentairegeneral
        } as Variete));
        res.json(varietes);
      })
      .catch((e: Error) => {
        console.error(e.stack);
      });
    } else {
      this.databaseService
      .getAllVarietes()
      .then((result: pg.QueryResult) => {
        const varietes: Variete[] = result.rows.map((variete: Variete) => ({
          nom: variete.nom,
          anneemiseenmarche: variete.anneemiseenmarche,
          description: variete.description,
          periodemiseenplace: variete.periodemiseenplace,
          perioderecolte: variete.perioderecolte,
          commentairegeneral: variete.commentairegeneral
        } as Variete));
        res.json(varietes);
      })
      .catch((e: Error) => {
        console.error(e.stack);
      });
    }
  });


  // ======= VARIETES IN RANGS ROUTES =======
  router.get("/varietes/rangs/:coordsRang?", (req: Request, res: Response, _: NextFunction) => {
  if(req.params.coordsRang) {
    this.databaseService
    .getAllVarietesOfSpecificRang(req.params.coordsRang)
    .then((result: pg.QueryResult) => {
      const varietesInRangs: VarieteContenuDansUnRang[] = result.rows.map((varieteInRang: VarieteContenuDansUnRang) => ({
        nomvariete: varieteInRang.nomvariete,
        coordonneesrang: varieteInRang.coordonneesrang,
        typemiseenplace: varieteInRang.typemiseenplace
      } as VarieteContenuDansUnRang));
      res.json(varietesInRangs);
    })
    .catch((e: Error) => {
      console.error(e.stack);
    });
  } else {
    this.databaseService
    .getAllVarietesInRangs()
    .then((result: pg.QueryResult) => {
      const varietesInRangs: VarieteContenuDansUnRang[] = result.rows.map((varieteInRang: VarieteContenuDansUnRang) => ({
        nomvariete: varieteInRang.nomvariete,
        coordonneesrang: varieteInRang.coordonneesrang,
        typemiseenplace: varieteInRang.typemiseenplace
      } as VarieteContenuDansUnRang));
      res.json(varietesInRangs);
    })
    .catch((e: Error) => {
      console.error(e.stack);
    });
  }
  });

  // ======= PLANTES =======
  router.get("/plantes/:nomLatin?", (req: Request, res: Response, _: NextFunction) => {
  if(req.params.nomLatin) {
    this.databaseService
    .getSpecificPlante(req.params.nomLatin)
    .then((result: pg.QueryResult) => {
      const plantes: Plante[] = result.rows.map((plante: Plante) => ({
        nomlatin: plante.nomlatin,
        nom: plante.nom,
        categorie: plante.categorie,
        typeplante: plante.typeplante,
        soustypeplante: plante.soustypeplante,
        nomvariete: plante.nomvariete,
      } as Plante));
      res.json(plantes);
    })
    .catch((e: Error) => {
      console.error(e.stack);
    });
  } else {
    this.databaseService
    .getAllPlantes()
    .then((result: pg.QueryResult) => {
      const plantes: Plante[] = result.rows.map((plante: Plante) => ({
        nomlatin: plante.nomlatin,
        nom: plante.nom,
        categorie: plante.categorie,
        typeplante: plante.typeplante,
        soustypeplante: plante.soustypeplante,
        nomvariete: plante.nomvariete,
      } as Plante));
      res.json(plantes);
    })
    .catch((e: Error) => {
      console.error(e.stack);
    });
  }
  });



  //   router.get(
  //     "/hotels/hotelNb",
  //     (req: Request, res: Response, _: NextFunction) => {
  //       this.databaseService
  //         .getHotelNamesByNos()
  //         .then((result: pg.QueryResult) => {
  //           const hotelsNbsNames = result.rows.map((hotel: HotelPK) => ({
  //             hotelnb: hotel.hotelnb,
  //             name: hotel.name,
  //           }));
  //           res.json(hotelsNbsNames);
  //         })

  //         .catch((e: Error) => {
  //           console.error(e.stack);
  //         });
  //     }
  //   );


  //   router.post(
  //     "/hotels/insert",
  //     (req: Request, res: Response, _: NextFunction) => {
  //       const hotel: Hotel = {
  //         hotelnb: req.body.hotelnb,
  //         name: req.body.name,
  //         city: req.body.city,
  //       };

  //       this.databaseService
  //         .createHotel(hotel)
  //         .then((result: pg.QueryResult) => {
  //           res.json(result.rowCount);
  //         })
  //         .catch((e: Error) => {
  //           console.error(e.stack);
  //           res.json(-1);
  //         });
  //     }
  //   );


  //   router.post(
  //     "/hotels/delete/:hotelNb",
  //     (req: Request, res: Response, _: NextFunction) => {
  //       const hotelNb: string = req.params.hotelNb;
  //       this.databaseService
  //         .deleteHotel(hotelNb)
  //         .then((result: pg.QueryResult) => {
  //           res.json(result.rowCount);
  //         })
  //         .catch((e: Error) => {
  //           console.error(e.stack);
  //         });
  //     }
  //   );


  //   router.put(
  //     "/hotels/update",
  //     (req: Request, res: Response, _: NextFunction) => {
  //       const hotel: Hotel = {
  //         hotelnb: req.body.hotelnb,
  //         name: req.body.name ? req.body.name : "",
  //         city: req.body.city ? req.body.city : "",
  //       };

  //       this.databaseService
  //         .updateHotel(hotel)
  //         .then((result: pg.QueryResult) => {
  //           res.json(result.rowCount);
  //         })
  //         .catch((e: Error) => {
  //           console.error(e.stack);
  //         });
  //     }
  //   );


  //   // ======= ROOMS ROUTES =======
  //   router.get("/rooms", (req: Request, res: Response, _: NextFunction) => {
  //     const hotelNb = req.query.hotelNb ? req.query.hotelNb : "";
  //     const roomNb = req.query.roomNb ? req.query.roomNb : "";
  //     const roomType = req.query.type ? req.query.type : "";
  //     const roomPrice = req.query.price ? parseFloat(req.query.price) : -1;

  //     this.databaseService
  //       .filterRooms(hotelNb, roomNb, roomType, roomPrice)
  //       .then((result: pg.QueryResult) => {
  //         const rooms: Room[] = result.rows.map((room: Room) => ({
  //           hotelnb: room.hotelnb,
  //           roomnb: room.roomnb,
  //           type: room.type,
  //           price: parseFloat(room.price.toString()),
  //         }));

  //         res.json(rooms);
  //       })
  //       .catch((e: Error) => {
  //         console.error(e.stack);
  //       });
  //   });


  //   router.post(
  //     "/rooms/insert",
  //     (req: Request, res: Response, _: NextFunction) => {
  //       const room: Room = {
  //         hotelnb: req.body.hotelnb,
  //         roomnb: req.body.roomnb,
  //         type: req.body.type,
  //         price: parseFloat(req.body.price),
  //       };

  //       this.databaseService
  //         .createRoom(room)
  //         .then((result: pg.QueryResult) => {
  //           res.json(result.rowCount);
  //         })
  //         .catch((e: Error) => {
  //           console.error(e.stack);
  //           res.json(-1);
  //         });
  //     }
  //   );


  //   router.put(
  //     "/rooms/update",
  //     (req: Request, res: Response, _: NextFunction) => {
  //       const room: Room = {
  //         hotelnb: req.body.hotelnb,
  //         roomnb: req.body.roomnb,
  //         type: req.body.type,
  //         price: parseFloat(req.body.price),
  //       };

  //       this.databaseService
  //         .updateRoom(room)
  //         .then((result: pg.QueryResult) => {
  //           res.json(result.rowCount);
  //         })
  //         .catch((e: Error) => {
  //           console.error(e.stack);
  //           res.json(-1);
  //         });
  //     }
  //   );


  //   router.post(
  //     "/rooms/delete/:hotelNb/:roomNb",
  //     (req: Request, res: Response, _: NextFunction) => {
  //       const hotelNb: string = req.params.hotelNb;
  //       const roomNb: string = req.params.roomNb;

  //       this.databaseService
  //         .deleteRoom(hotelNb, roomNb)
  //         .then((result: pg.QueryResult) => {
  //           res.json(result.rowCount);
  //         })
  //         .catch((e: Error) => {
  //           console.error(e.stack);
  //           res.json(-1);
  //         });
  //     }
  //   );


  //   // ======= GUEST ROUTES =======
  //   router.post(
  //     "/guests/insert",
  //     (req: Request, res: Response, _: NextFunction) => {
  //       const guest: Guest = {
  //         guestnb: req.body.guestnb,
  //         nas: req.body.nas,
  //         name: req.body.name,
  //         gender: req.body.gender,
  //         city: req.body.city
  //       };

  //       this.databaseService
  //         .createGuest(guest)
  //         .then((result: pg.QueryResult) => {
  //           res.json(result.rowCount);
  //         })
  //         .catch((e: Error) => {
  //           console.error(e.stack);
  //           res.json(-1);
  //         });
  //     }
  //   );


  //   router.get(
  //     "/guests/:hotelNb/:roomNb",
  //     (req: Request, res: Response, _: NextFunction) => {
  //       const hotelNb: string = req.params.hotelNb;
  //       const roomNb: string = req.params.roomNb;

  //       this.databaseService
  //       .getGuests(hotelNb, roomNb)
  //       .then((result: pg.QueryResult) => {
  //         const guests: Guest[] = result.rows.map((guest: any) => ({
  //           guestnb: guest.guestnb,
  //           nas: guest.nas,
  //           name: guest.name,
  //           gender: guest.gender,
  //           city: guest.city,
  //         }));
  //         res.json(guests);
  //       })
  //       .catch((e: Error) => {
  //         console.error(e.stack);
  //         res.json(-1);
  //       });
  //     }
  //   );


  //   // ======= GENERAL ROUTES =======
  //   router.get(
  //     "/tables/:tableName",
  //     (req: Request, res: Response, next: NextFunction) => {
  //       this.databaseService
  //         .getAllFromTable(req.params.tableName)
  //         .then((result: pg.QueryResult) => {
  //           res.json(result.rows);
  //         })
  //         .catch((e: Error) => {
  //           console.error(e.stack);
  //         });
  //     }
  //   );

    return router;
  }
}
