import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Jardin } from "../../../common/tables/Jardin"
import { Parcelle } from "../../../common/tables/Parcelle"
// tslint:disable-next-line:ordered-imports
import { of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class CommunicationService {
  private readonly BASE_URL: string = "http://localhost:3000/database";
  public constructor(private http: HttpClient) {}

  private _listeners: any = new Subject<any>();

  listen(): Observable<any> {
    return this._listeners.asObservable();
  }

  filter(filterBy: string): void {
    this._listeners.next(filterBy);
  }

  // ======= JARDINS =======

  getAllJardins(): Observable<Jardin[]> {
    return this.http
      .get<Jardin[]>(this.BASE_URL + "/jardins")
      .pipe(catchError(this.handleError<Jardin[]>("getAllJardins")));
  }

  getSpecificJardin(id: number): Observable<Jardin[]> {
    return this.http
      .get<Jardin[]>(this.BASE_URL + `/jardins/${id}`)
      .pipe(catchError(this.handleError<Jardin[]>("getSpecificJardin")));
  }


  // ======= PARCELLES =======
  getAllParcelles(): Observable<Parcelle[]> {
    return this.http
      .get<Parcelle[]>(this.BASE_URL + `/parcelles`)
      .pipe(catchError(this.handleError<Parcelle[]>("getAllParcelles")));
  }

  getAllParcellesOfJardin(jardinID: number): Observable<Parcelle[]> {
    return this.http
      .get<Parcelle[]>(this.BASE_URL + `/parcelles/${jardinID}`)
      .pipe(catchError(this.handleError<Parcelle[]>("getAllParcellesOfJardin")));
  }

  // getAllRangsOfParcelle(parcelle: Parcelle): Observable<Parcelle[]> {
  //   return this.http
  //   .get<Jardin[]>(this.BASE_URL + `/rangs/${id.toString()}`)
  //   .pipe(catchError(this.handleError<Jardin[]>("getAllJardins")));
  // }



  // public insertHotel(hotel: Hotel): Observable<number> {
  //   return this.http
  //     .post<number>(this.BASE_URL + "/hotels/insert", hotel)
  //     .pipe(catchError(this.handleError<number>("insertHotel")));
  // }

  // public updateHotel(hotel: Hotel): Observable<number> {
  //   return this.http
  //     .put<number>(this.BASE_URL + "/hotels/update", hotel)
  //     .pipe(catchError(this.handleError<number>("updateHotel")));
  // }

  // public deleteHotel(hotelNb: string): Observable<number> {
  //   return this.http
  //     .post<number>(this.BASE_URL + "/hotels/delete/" + hotelNb, {})
  //     .pipe(catchError(this.handleError<number>("deleteHotel")));
  // }

  // public getHotelPKs(): Observable<HotelPK[]> {
  //   return this.http
  //     .get<HotelPK[]>(this.BASE_URL + "/hotels/hotelNb")
  //     .pipe(catchError(this.handleError<HotelPK[]>("getHotelPKs")));
  // }

  // public getRooms(hotelNb: string): Observable<Room[]> {
  //   return this.http
  //     .get<Room[]>(this.BASE_URL + `/rooms?hotelNb=${hotelNb}`)
  //     .pipe(catchError(this.handleError<Room[]>("getRooms")));
  // }

  // public insertRoom(room: Room): Observable<number> {
  //   return this.http
  //     .post<number>(this.BASE_URL + "/rooms/insert", room)
  //     .pipe(catchError(this.handleError<number>("inserHotel")));
  // }

  // public updateRoom(room: Room): Observable<number> {
  //   return this.http
  //     .put<number>(this.BASE_URL + "/rooms/update", room)
  //     .pipe(catchError(this.handleError<number>("updateRoom")));
  // }

  // public deleteRoom(hotelNb: string, roomNb: string): Observable<number> {
  //   return this.http
  //     .post<number>(this.BASE_URL + `/rooms/delete/${hotelNb}/${roomNb}`, {})
  //     .pipe(catchError(this.handleError<number>("deleteRoom")));
  // }

  // public getGuests(hotelNb: string, roomNb: string): Observable<Guest[]> {
  //   return this.http
  //     .get<Guest[]>(this.BASE_URL + `/guests/${hotelNb}/${roomNb}`)
  //     .pipe(catchError(this.handleError<Guest[]>("getGuests")));
  // }

  private handleError<T>(
    request: string,
    result?: T
  ): (error: Error) => Observable<T> {
    return (error: Error): Observable<T> => {
      return of(result as T);
    };
  }
}
