import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Jardin } from "../../../../common/tables/Jardin";
import { Parcelle } from "../../../../common/tables/Parcelle";

export interface DData {
  jardin: Jardin;
  parcelles: Parcelle[];
}

@Component ({
  selector: 'DialogComponent',
  templateUrl: './dialog.component.html',
})
export class DialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DData) {}
}

// onNoClick(): void {
//   this.dialogRef.close();
// }
