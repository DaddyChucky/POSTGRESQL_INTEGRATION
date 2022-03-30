import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Jardin } from '../../../../common/tables/Jardin';
import { CommunicationService } from '../communication.service';
import { DialogComponent } from './dialog.component';

@Component({
  selector: 'app-jardins',
  templateUrl: './jardins.component.html',
  styleUrls: ['./jardins.component.css']
})
export class JardinsComponent implements OnInit {
  jardins: Jardin[];
  displayedColumns: string[] = ['ID', 'nom', 'surface', 'bPotager', 'bOrnement', 'bVerger', 'typeSol', 'hauteurMaximale', 'moreInfo'];

  constructor(public dialog: MatDialog, private readonly communicationService: CommunicationService) {}

  openDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        animal: 'panda',
      },
    });
  }

  ngOnInit(): void {
    this.getAllJardins();
  }

  private getAllJardins() {
    this.communicationService.getAllJardins().subscribe((jardins: Jardin[]) => {
      console.log(jardins);
      this.jardins = jardins ? jardins : [];
    });
  }
}




