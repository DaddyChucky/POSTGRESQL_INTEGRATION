import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Jardin } from '../../../../common/tables/Jardin';
import { Parcelle } from '../../../../common/tables/Parcelle';
import { Rang } from '../../../../common/tables/Rang';
import { CommunicationService } from '../communication.service';
import { DialogComponent } from './dialog.component';
import { RangParcelle } from './rang-parcelle';
import { VarieteContenuDansUnRang } from '../../../../common/tables/VarieteContenuDansUnRang';

@Component({
  selector: 'app-jardins',
  templateUrl: './jardins.component.html',
  styleUrls: ['./jardins.component.css']
})
export class JardinsComponent implements OnInit {
  parcelles: Parcelle[];
  jardins: Jardin[];
  rangs: Rang[];
  varietesInRangs: VarieteContenuDansUnRang[];
  displayedColumns: string[] = ['ID', 'nom', 'surface', 'type', 'typeSol', 'hauteurMaximale', 'moreInfo'];

  constructor(public dialog: MatDialog, private readonly communicationService: CommunicationService) {}

  ngOnInit(): void {
    this.getAllJardins();
    this.getAllParcelles();
    this.getAllRangs();
    this.getAllVarietesInRangs();
  }

  openDialog(jardin: Jardin) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '650px';
    const parcelles = this.getAllParcellesOfJardin(jardin);
    dialogConfig.data = {
      jardin,
      parcelles,
      rangsParcelles: this.getRangsOfSpecificParcelles(parcelles),
      varietesInRangs: this.varietesInRangs
    };
    this.dialog.open(DialogComponent, dialogConfig);
  }

  private getAllParcellesOfJardin(jardin: Jardin): Parcelle[] {
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

  private getAllRangs(): void {
    this.communicationService.getAllRangs().subscribe((rangs: Rang[]) => {
      this.rangs = rangs ? rangs : [];
    });
  }

  private getRangsOfSpecificParcelles(parcelles: Parcelle[]): RangParcelle[] {
    const rangsEtParcelles: RangParcelle[] = [];
    parcelles.forEach((parcelle: Parcelle) => {
      rangsEtParcelles.push({parcelle, rangs: this.rangs.filter((rang: Rang) => rang.coordonneesparcelle === parcelle.coordonnees)} as RangParcelle);
    });
    return rangsEtParcelles;
  }

  private getAllVarietesInRangs(): void {
    this.communicationService.getAllVarietesInRangs().subscribe((varietesInRangs: VarieteContenuDansUnRang[]) => {
      this.varietesInRangs = varietesInRangs ? varietesInRangs : [];
    });
  }
}
