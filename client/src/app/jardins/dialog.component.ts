import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Parcelle } from "../../../../common/tables/Parcelle";
import { Rang } from "../../../../common/tables/Rang";
import { VarieteContenuDansUnRang } from "../../../../common/tables/VarieteContenuDansUnRang";
import { DialogData } from "./dialog-data";
import { RangParcelle } from "./rang-parcelle";

@Component ({
  selector: 'DialogComponent',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  getRangsOfParcelle(parcelle: Parcelle, rangsParcelles: RangParcelle[]): RangParcelle[] {
    return rangsParcelles.filter((rangParcelle: RangParcelle) => rangParcelle.parcelle.coordonnees === parcelle.coordonnees);
  }

  getVarietesOfRang(varietesInRangs: VarieteContenuDansUnRang[], rang: Rang): VarieteContenuDansUnRang[] {
    return varietesInRangs.filter((varieteInRang: VarieteContenuDansUnRang) => varieteInRang.coordonneesrang === rang.coordonneesrang);
  }
}
