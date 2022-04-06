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
import { Semencier } from '../../../common/tables/Semencier';
import { AdaptationTypeSolVariete } from '../../../common/tables/AdaptationTypeSolVariete';
import { Production } from '../../../common/tables/Production';

@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService) private readonly databaseService: DatabaseService
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
  
    router.post(
      "/varietes",
      (req: Request, res: Response, _: NextFunction) => {
        const variete: Variete = {
          nom: req.body.nom,
          anneemiseenmarche: req.body.anneemiseenmarche,
          description: req.body.description,
          periodemiseenplace: req.body.periodemiseenplace,
          perioderecolte: req.body.perioderecolte,
          commentairegeneral: req.body.commentairegeneral,
        };
        this.databaseService
          .addVariete(variete)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );
  
    router.put(
      "/varietes",
      (req: Request, res: Response, _: NextFunction) => {
        const variete: Variete = {
          nom: req.body.nom,
          anneemiseenmarche: req.body.anneemiseenmarche,
          description: req.body.description,
          periodemiseenplace: req.body.periodemiseenplace,
          perioderecolte: req.body.perioderecolte,
          commentairegeneral: req.body.commentairegeneral,
          oldvarietename: req.body.oldvarietename
        };
        this.databaseService
          .updateVariete(variete)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );
  
    router.delete(
      "/varietes/:variete",
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .deleteVariete(req.params.variete)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );
  
  
    // ======= VARIETES IN RANGS ROUTES =======
    router.get("/varietesrangs/:coordsRang?", (req: Request, res: Response, _: NextFunction) => {
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

    // ======= SEMENCIERS =======
    router.get("/semenciers/:nom?", (req: Request, res: Response, _: NextFunction) => {
      if(req.params.nom) {
        this.databaseService
        .getSpecificSemencier(req.params.nom)
        .then((result: pg.QueryResult) => {
          const semenciers: Semencier[] = result.rows.map((semencier: Semencier) => ({
            nom: semencier.nom,
            siteweb: semencier.siteweb
          } as Semencier));
          res.json(semenciers);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
      } else {
        this.databaseService
        .getAllSemencier()
        .then((result: pg.QueryResult) => {
          const semenciers: Semencier[] = result.rows.map((semencier: Semencier) => ({
            nom: semencier.nom,
            siteweb: semencier.siteweb
          } as Semencier));
          res.json(semenciers);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
      }
    });
  
    // ======= ADAPTATIONTYPESOLVARIETE =======
    router.get("/adaptations/:nomVariete?", (req: Request, res: Response, _: NextFunction) => {
      if(req.params.nomVariete) {
        this.databaseService
        .getSpecificAdaptationTypeSolVariete(req.params.nomVariete)
        .then((result: pg.QueryResult) => {
          const adaptations: AdaptationTypeSolVariete[] = result.rows.map((adaptation: AdaptationTypeSolVariete) => ({
            adaptationtypesol: adaptation.adaptationtypesol,
            nomvariete: adaptation.nomvariete
          } as AdaptationTypeSolVariete));
          res.json(adaptations);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
      } else {
        this.databaseService
        .getAllAdaptationTypeSolVariete()
        .then((result: pg.QueryResult) => {
          const adaptations: AdaptationTypeSolVariete[] = result.rows.map((adaptation: AdaptationTypeSolVariete) => ({
            adaptationtypesol: adaptation.adaptationtypesol,
            nomvariete: adaptation.nomvariete
          } as AdaptationTypeSolVariete));
          res.json(adaptations);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
      }
    });
  
    router.post(
      "/adaptations",
      (req: Request, res: Response, _: NextFunction) => {
        const adaptation: AdaptationTypeSolVariete = {
          adaptationtypesol: req.body.adaptationtypesol,
          nomvariete: req.body.nomvariete,
        };
        this.databaseService
          .addAdaptation(adaptation)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );

    router.put(
      "/adaptations",
      (req: Request, res: Response, _: NextFunction) => {
        const adaptation: AdaptationTypeSolVariete = {
          nomvariete: req.body.nomvariete,
          adaptationtypesol: req.body.adaptationtypesol,
          oldnomvariete: req.body.oldnomvariete,
          oldadaptationtypesol: req.body.oldadaptationtypesol,
        };
        this.databaseService
          .updateAdaptation(adaptation)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );

    // ======= PRODUCTIONS =======
    router.get("/productions/:nomVariete?", (req: Request, res: Response, _: NextFunction) => {
      if(req.params.nomVariete) {
        this.databaseService
        .getSpecificProduction(req.params.nomVariete)
        .then((result: pg.QueryResult) => {
          const productions: Production[] = result.rows.map((production: Production) => ({
            nomvariete: production.nomvariete,
            nomsemencier: production.nomsemencier,
            produitbio: production.produitbio,
          } as Production));
          res.json(productions);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
      } else {
        this.databaseService
        .getAllProduction()
        .then((result: pg.QueryResult) => {
          const productions: Production[] = result.rows.map((production: Production) => ({
            nomvariete: production.nomvariete,
            nomsemencier: production.nomsemencier,
            produitbio: production.produitbio,
          } as Production));
          res.json(productions);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
      }
    });

    router.post(
      "/productions",
      (req: Request, res: Response, _: NextFunction) => {
        const production: Production = {
          nomvariete: req.body.nomvariete,
          nomsemencier: req.body.nomsemencier,
          produitbio: req.body.produitbio
        };
        this.databaseService
          .addProduction(production)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );

    router.put(
      "/productions",
      (req: Request, res: Response, _: NextFunction) => {
        const production: Production = {
          nomvariete: req.body.nomvariete,
          nomsemencier: req.body.nomsemencier,
          produitbio: req.body.produitbio,
          oldnomvariete: req.body.oldnomvariete,
          oldnomsemencier: req.body.oldnomsemencier
        };
        this.databaseService
          .updateProduction(production)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );

    return router;
  }
}
