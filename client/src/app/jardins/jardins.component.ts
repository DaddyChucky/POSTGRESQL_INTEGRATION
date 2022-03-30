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
  parcelles: Parcelle[];
  jardins: Jardin[];
  displayedColumns: string[] = ['ID', 'nom', 'surface', 'bPotager', 'bOrnement', 'bVerger', 'typeSol', 'hauteurMaximale', 'moreInfo'];

  constructor(public dialog: MatDialog, private readonly communicationService: CommunicationService) {}

  ngOnInit(): void {
    this.getAllJardins();
    this.getAllParcelles();
  }

  openDialog(jardin: Jardin) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '650px';
    dialogConfig.data = {
      jardin,
      parcelles: this.getAllParcellesOfJardin(jardin),
    };
    this.dialog.open(DialogComponent, dialogConfig);
  }

  private getAllParcellesOfJardin(jardin: Jardin): Parcelle[] {
    console.log(this.parcelles.filter((parcelle: Parcelle) => parcelle.idjardin === jardin.id));
    return this.parcelles.filter((parcelle: Parcelle) => parcelle.idjardin === jardin.id);
  }

  private getAllParcelles(): void {
    this.communicationService.getAllParcelles().subscribe((parcelles: Parcelle[]) => {
      this.parcelles = parcelles ? parcelles : [];
    });
  }

  private getAllJardins(): void {
    this.communicationService.getAllJardins().subscribe((jardins: Jardin[]) => {
      this.jardins = jardins ? jardins : [];
    });
  }
}




