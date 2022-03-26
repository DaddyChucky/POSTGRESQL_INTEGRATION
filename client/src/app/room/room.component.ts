import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { HotelPK } from "../../../../common/tables/HotelPK";
import { Room } from "../../../../common/tables/Room";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-room",
  templateUrl: "./room.component.html",
  styleUrls: ["./room.component.css"],
})

export class RoomComponent implements OnInit {
  public hotelPKs: HotelPK[] = [];
  public rooms: Room[] = [];
  public duplicateError: boolean = false;
  public invalidHotelPK: boolean = false;
  public selectedHotel: HotelPK = {
    hotelnb: "-1",
    name: "placeholderHotel",
  };

  @ViewChild("newRoomNb") newRoomNb: ElementRef;
  @ViewChild("newRoomType") newRoomType: ElementRef;
  @ViewChild("newRoomPrice") newRoomPrice: ElementRef;

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

  public getRooms(): void {
    this.communicationService
      .getRooms(this.selectedHotel.hotelnb)
      .subscribe((rooms: Room[]) => {
        this.rooms = rooms;
      });
  }

  private refresh() {
    this.getRooms();
    this.newRoomNb.nativeElement.innerText = "";
    this.newRoomType.nativeElement.innerText = "";
    this.newRoomPrice.nativeElement.innerText = "";
  }

  public changeRoomType(event: any, i: number) {
    const editField = event.target.textContent;
    this.rooms[i].type = editField;
  }

  public changeRoomPrice(event: any, i: number) {
    const editField = event.target.textContent;
    this.rooms[i].price = editField;
  }

  public deleteRoom(hotelNb: string, roomNb: string) {
    this.communicationService
      .deleteRoom(hotelNb, roomNb)
      .subscribe((res: any) => {
        this.refresh();
      });
  }

  public insertRoom(): void {
    const room: Room = {
      hotelnb: this.selectedHotel.hotelnb,
      roomnb: this.newRoomNb.nativeElement.innerText,
      type: this.newRoomType.nativeElement.innerText,
      price: this.newRoomPrice.nativeElement.innerText,
    };

    this.communicationService.insertRoom(room).subscribe((res: number) => {
      this.refresh();
    });
  }

  public updateRoom(i: number) {
    this.communicationService
      .updateRoom(this.rooms[i])
      .subscribe((res: any) => {
        this.refresh();
      });
  }
}
