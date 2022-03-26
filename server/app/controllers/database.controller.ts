import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

import { Hotel } from "../../../common/tables/Hotel";
import { HotelPK } from "../../../common/tables/HotelPK";
import { Room } from "../../../common/tables/Room";
import { Guest } from "../../../common/tables/Guest";

import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
  public constructor(
    @inject(Types.DatabaseService) private databaseService: DatabaseService
  ) {}

  public get router(): Router {
    const router: Router = Router();

    // ======= HOTEL ROUTES =======
    // ex http://localhost:3000/database/hotel?hotelNb=3&name=LeGrandHotel&city=laval
    router.get("/hotels", (req: Request, res: Response, _: NextFunction) => {
      var hotelNb = req.params.hotelNb ? req.params.hotelNb : "";
      var hotelName = req.params.name ? req.params.name : "";
      var hotelCity = req.params.city ? req.params.city : "";

      this.databaseService
        .filterHotels(hotelNb, hotelName, hotelCity)
        .then((result: pg.QueryResult) => {
          const hotels: Hotel[] = result.rows.map((hotel: Hotel) => ({
            hotelnb: hotel.hotelnb,
            name: hotel.name,
            city: hotel.city,
          }));
          res.json(hotels);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });


    router.get(
      "/hotels/hotelNb",
      (req: Request, res: Response, _: NextFunction) => {
        this.databaseService
          .getHotelNamesByNos()
          .then((result: pg.QueryResult) => {
            const hotelsNbsNames = result.rows.map((hotel: HotelPK) => ({
              hotelnb: hotel.hotelnb,
              name: hotel.name,
            }));
            res.json(hotelsNbsNames);
          })

          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );


    router.post(
      "/hotels/insert",
      (req: Request, res: Response, _: NextFunction) => {
        const hotel: Hotel = {
          hotelnb: req.body.hotelnb,
          name: req.body.name,
          city: req.body.city,
        };

        this.databaseService
          .createHotel(hotel)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );


    router.post(
      "/hotels/delete/:hotelNb",
      (req: Request, res: Response, _: NextFunction) => {
        const hotelNb: string = req.params.hotelNb;
        this.databaseService
          .deleteHotel(hotelNb)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );


    router.put(
      "/hotels/update",
      (req: Request, res: Response, _: NextFunction) => {
        const hotel: Hotel = {
          hotelnb: req.body.hotelnb,
          name: req.body.name ? req.body.name : "",
          city: req.body.city ? req.body.city : "",
        };

        this.databaseService
          .updateHotel(hotel)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );


    // ======= ROOMS ROUTES =======
    router.get("/rooms", (req: Request, res: Response, _: NextFunction) => {
      const hotelNb = req.query.hotelNb ? req.query.hotelNb : "";
      const roomNb = req.query.roomNb ? req.query.roomNb : "";
      const roomType = req.query.type ? req.query.type : "";
      const roomPrice = req.query.price ? parseFloat(req.query.price) : -1;

      this.databaseService
        .filterRooms(hotelNb, roomNb, roomType, roomPrice)
        .then((result: pg.QueryResult) => {
          const rooms: Room[] = result.rows.map((room: Room) => ({
            hotelnb: room.hotelnb,
            roomnb: room.roomnb,
            type: room.type,
            price: parseFloat(room.price.toString()),
          }));

          res.json(rooms);
        })
        .catch((e: Error) => {
          console.error(e.stack);
        });
    });


    router.post(
      "/rooms/insert",
      (req: Request, res: Response, _: NextFunction) => {
        const room: Room = {
          hotelnb: req.body.hotelnb,
          roomnb: req.body.roomnb,
          type: req.body.type,
          price: parseFloat(req.body.price),
        };

        this.databaseService
          .createRoom(room)
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
      "/rooms/update",
      (req: Request, res: Response, _: NextFunction) => {
        const room: Room = {
          hotelnb: req.body.hotelnb,
          roomnb: req.body.roomnb,
          type: req.body.type,
          price: parseFloat(req.body.price),
        };

        this.databaseService
          .updateRoom(room)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );


    router.post(
      "/rooms/delete/:hotelNb/:roomNb",
      (req: Request, res: Response, _: NextFunction) => {
        const hotelNb: string = req.params.hotelNb;
        const roomNb: string = req.params.roomNb;

        this.databaseService
          .deleteRoom(hotelNb, roomNb)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );


    // ======= GUEST ROUTES =======
    router.post(
      "/guests/insert",
      (req: Request, res: Response, _: NextFunction) => {
        const guest: Guest = {
          guestnb: req.body.guestnb,
          nas: req.body.nas,
          name: req.body.name,
          gender: req.body.gender,
          city: req.body.city
        };

        this.databaseService
          .createGuest(guest)
          .then((result: pg.QueryResult) => {
            res.json(result.rowCount);
          })
          .catch((e: Error) => {
            console.error(e.stack);
            res.json(-1);
          });
      }
    );


    router.get(
      "/guests/:hotelNb/:roomNb",
      (req: Request, res: Response, _: NextFunction) => {
        const hotelNb: string = req.params.hotelNb;
        const roomNb: string = req.params.roomNb;

        this.databaseService
        .getGuests(hotelNb, roomNb)
        .then((result: pg.QueryResult) => {
          const guests: Guest[] = result.rows.map((guest: any) => ({
            guestnb: guest.guestnb,
            nas: guest.nas,
            name: guest.name,
            gender: guest.gender,
            city: guest.city,
          }));
          res.json(guests);
        })
        .catch((e: Error) => {
          console.error(e.stack);
          res.json(-1);
        });
      }
    );


    // ======= GENERAL ROUTES =======
    router.get(
      "/tables/:tableName",
      (req: Request, res: Response, next: NextFunction) => {
        this.databaseService
          .getAllFromTable(req.params.tableName)
          .then((result: pg.QueryResult) => {
            res.json(result.rows);
          })
          .catch((e: Error) => {
            console.error(e.stack);
          });
      }
    );

    return router;
  }
}
