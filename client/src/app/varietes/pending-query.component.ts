import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from "../../../../common/communication/dialog-data";

@Component ({
  selector: 'PendingQueryComponent',
  templateUrl: './pending-query.component.html',
  styleUrls: ['./pending-query.component.css', '../jardins/dialog.component.css'],
})

export class PendingQueryComponent {
  constructor(public dialogRef: MatDialogRef<PendingQueryComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
