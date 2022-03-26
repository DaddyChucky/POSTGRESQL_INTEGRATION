import { Component, OnInit } from "@angular/core";
import { HotelPK } from "../../../../common/tables/HotelPK";
import { Room } from "../../../../common/tables/Room";
import { Guest } from "../../../../common/tables/Guest";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-room",
  templateUrl: "./guest.component.html",
  styleUrls: ["./guest.component.css"],
})
export class GuestComponent implements OnInit {
  public hotelPKs: HotelPK[] = [];
  public rooms: Room[] = [];
  public guests: Guest[] = [];

  public duplicateError: boolean = false;
  public invalidHotelPK: boolean = false;

  public selectedHotel: HotelPK = {
    hotelnb: "-1",
    name: "placeholderHotel",
  };

  public selectedRoom: Room = {
    hotelnb: "-1",
    roomnb: "-1",
    type: "",
    price: 0
  }

  public constructor(private communicationService: CommunicationService) {}

  public ngOnInit(): void {
    this.communicationService.getHotelPKs().subscribe((hotelPKs: HotelPK[]) => {
      this.hotelPKs = hotelPKs;
      this.selectedHotel = this.hotelPKs[0];
      this.getRooms();
    });
  }

  public updateSelectedHotel(hotelID: any) {
    this.selectedHotel = this.hotelPKs[hotelID];
    this.getRooms();
    this.refresh();
  }

  public updateSelectedRoom(roomID: any) {
    this.selectedRoom = this.rooms[roomID];
    this.refresh();
  }

  public getRooms(): void {
    this.communicationService
      .getRooms(this.selectedHotel.hotelnb)
      .subscribe((rooms: Room[]) => {
        this.rooms = rooms;
        this.selectedRoom = this.rooms[0];
      });
  }

  private refresh() {
    this.getGuests();
  }

  public getGuests(): void {
    this.communicationService
      .getGuests(this.selectedHotel.hotelnb, this.selectedRoom.roomnb)
      .subscribe((guests: Guest[]) => {
        this.guests = guests;
      });
  }
}
