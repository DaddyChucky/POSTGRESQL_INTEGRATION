import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from "../../../../common/communication/dialog-data";

@Component ({
  selector: 'AddVarieteComponent',
  templateUrl: './add-variete.component.html',
  styleUrls: ['./add-variete.component.css', '../jardins/dialog.component.css']
})

export class AddVarieteComponent {
  constructor(public dialogRef: MatDialogRef<AddVarieteComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
