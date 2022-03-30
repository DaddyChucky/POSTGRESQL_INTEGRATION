import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Jardin } from '../../../../common/tables/Jardin';
import { Parcelle } from '../../../../common/tables/Parcelle';
import { CommunicationService } from '../communication.service';
import { DialogComponent } from './dialog.component';

@Component({
  selector: 'app-jardins',
  templateUrl: './jardins.component.html',
  styleUrls: ['./jardins.component.css']
})
export class JardinsComponent implements OnInit {
  jardins: Jardin[] = [];
  parcelles: Parcelle[] = [];
  displayedColumns: string[] = ['ID', 'nom', 'surface', 'bPotager', 'bOrnement', 'bVerger', 'typeSol', 'hauteurMaximale', 'moreInfo'];

  constructor(public dialog: MatDialog, private readonly communicationService: CommunicationService) {}

  ngOnInit(): void {
    this.getAllJardins();
  }

  openDialog(jardin: Jardin) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '400px';
    dialogConfig.width = '600px';
    this.getAllParcellesOfJardin(jardin);
    dialogConfig.data = {
      jardin,
      parcelles: this.parcelles,
    };
    this.dialog.open(DialogComponent, dialogConfig);
  }

  private getAllParcellesOfJardin(jardin: Jardin) {
    this.communicationService.getAllParcellesOfJardin().subscribe((parcelles: Parcelle[]) => {
      this.parcelles = parcelles ? parcelles : [];
    });
  }

  private getAllJardins() {
    this.communicationService.getAllJardins().subscribe((jardins: Jardin[]) => {
      this.jardins = jardins ? jardins : [];
    });
  }
}




