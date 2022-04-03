import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Jardin } from "../../../common/tables/Jardin"
import { Parcelle } from "../../../common/tables/Parcelle"
import { Rang } from "../../../common/tables/Rang"
import { Plante } from "../../../common/tables/Plante"
import { of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { VarieteContenuDansUnRang } from '../../../common/tables/VarieteContenuDansUnRang';
import { Variete } from '../../../common/tables/Variete';
import { Semencier } from '../../../common/tables/Semencier';
import { AdaptationTypeSolVariete } from '../../../common/tables/AdaptationTypeSolVariete';
import { Production } from '../../../common/tables/Production';

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

  // ======= RANGS =======
  getAllRangs(): Observable<Rang[]> {
    return this.http
      .get<Rang[]>(this.BASE_URL + `/rangs`)
      .pipe(catchError(this.handleError<Rang[]>("getAllRangs")));
  }

  getAllRangsOfParcelle(parcelleCoords: string): Observable<Rang[]> {
    return this.http
      .get<Rang[]>(this.BASE_URL + `/rangs/${parcelleCoords}`)
      .pipe(catchError(this.handleError<Rang[]>("getAllRangsOfParcelle")));
  }

  // ======= VARIETES IN RANGS =======
  getAllVarietesInRangs(): Observable<VarieteContenuDansUnRang[]> {
    return this.http
      .get<VarieteContenuDansUnRang[]>(this.BASE_URL + `/varietesrangs`)
      .pipe(catchError(this.handleError<VarieteContenuDansUnRang[]>("getAllVarietesInRangs")));
  }

  getAllVarietesOfSpecificRang(coordonneesRang: string): Observable<VarieteContenuDansUnRang[]> {
    return this.http
      .get<VarieteContenuDansUnRang[]>(this.BASE_URL + `/varietesrangs/${coordonneesRang}`)
      .pipe(catchError(this.handleError<VarieteContenuDansUnRang[]>("getAllVarietesOfSpecificRang")));
  }

  // ======= VARIETES =======
  getAllVarietes(): Observable<Variete[]> {
    return this.http
      .get<Variete[]>(this.BASE_URL + `/varietes`)
      .pipe(catchError(this.handleError<Variete[]>("getAllVarietes")));
  }

  getSpecificVariete(nom: string): Observable<Variete[]> {
    return this.http
      .get<Variete[]>(this.BASE_URL + `/varietes/${nom}`)
      .pipe(catchError(this.handleError<Variete[]>("getSpecificVariete")));
  }

  // ======= PLANTES =======
  getAllPlantes(): Observable<Plante[]> {
    return this.http
      .get<Plante[]>(this.BASE_URL + `/plantes`)
      .pipe(catchError(this.handleError<Plante[]>("getAllPlantes")));
  }

  getSpecificPlante(nomLatin: string): Observable<Plante[]> {
    return this.http
      .get<Plante[]>(this.BASE_URL + `/plantes/${nomLatin}`)
      .pipe(catchError(this.handleError<Plante[]>("getSpecificPlante")));
  }

  // ======= PLANTES =======
  getAllSemencier(): Observable<Semencier[]> {
    return this.http
      .get<Semencier[]>(this.BASE_URL + `/semenciers`)
      .pipe(catchError(this.handleError<Semencier[]>("getAllSemencier")));
  }

  getSpecificSemencier(nom: string): Observable<Semencier[]> {
    return this.http
      .get<Semencier[]>(this.BASE_URL + `/semenciers/${nom}`)
      .pipe(catchError(this.handleError<Semencier[]>("getSpecificSemencier")));
  }

  // ======= ADAPTATIONTYPESOLVARIETE =======
  getAllAdaptationTypeSolVariete(): Observable<AdaptationTypeSolVariete[]> {
    return this.http
      .get<AdaptationTypeSolVariete[]>(this.BASE_URL + `/adaptations`)
      .pipe(catchError(this.handleError<AdaptationTypeSolVariete[]>("getAllAdaptationTypeSolVariete")));
  }

  getSpecificAdaptationTypeSolVariete(nomVariete: string): Observable<AdaptationTypeSolVariete[]> {
    return this.http
      .get<AdaptationTypeSolVariete[]>(this.BASE_URL + `/adaptations/${nomVariete}`)
      .pipe(catchError(this.handleError<AdaptationTypeSolVariete[]>("getSpecificAdaptationTypeSolVariete")));
  }

  public insertVariete(variete: Variete): Observable<number> {
    return this.http
      .post<number>(this.BASE_URL + "/varietes", variete)
      .pipe(catchError(this.handleError<number>("insertVariete")));
  }

  public updateVariete(variete: Variete): Observable<number> {
    return this.http
      .put<number>(this.BASE_URL + "/varietes", variete)
      .pipe(catchError(this.handleError<number>("updateVariete")));
  }

  // ======= PRODUCTION =======
  getAllProduction(): Observable<Production[]> {
    return this.http
      .get<Production[]>(this.BASE_URL + `/productions`)
      .pipe(catchError(this.handleError<Production[]>("getAllProduction")));
  }

  getSpecificProduction(nomVariete: string): Observable<Production[]> {
    return this.http
      .get<Production[]>(this.BASE_URL + `/productions/${nomVariete}`)
      .pipe(catchError(this.handleError<Production[]>("getSpecificProduction")));
  }




  // getAllRangsOfParcelle(parcelle: Parcelle): Observable<Parcelle[]> {
  //   return this.http
  //   .get<Jardin[]>(this.BASE_URL + `/rangs/${id.toString()}`)
  //   .pipe(catchError(this.handleError<Jardin[]>("getAllJardins")));
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
