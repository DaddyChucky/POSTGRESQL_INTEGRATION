import { Component, Inject } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog"
import { DialogData } from "../../../../common/communication/dialog-data";
import { PendingQueryComponent } from "./pending-query.component";
import { CommunicationService } from "../services/communication.service";

@Component ({
  selector: 'DeleteVarieteComponent',
  templateUrl: './delete-variete.component.html',
  styleUrls: ['./delete-variete.component.css', '../jardins/dialog.component.css'],
})

export class DeleteVarieteComponent {
  pending: boolean = true;
  success: boolean = false;

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<DeleteVarieteComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private readonly communicationService: CommunicationService) {}

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '650px';
    dialogConfig.data = {
      pending: this.pending,
      success: this.success,
      delete: true
    };
    this.dialog.closeAll();
    this.dialog.open(PendingQueryComponent, dialogConfig);
  }

  deleteVariete(): void {
    this.openDialog();
    this.communicationService.deleteVariete(this.data.variete.nom).subscribe((res: number) => {
      if (res !== -1) {
        this.success = true;
      }
      this.pending = false;
      this.openDialog();
    });
    this.pending = true;
    this.success = false;
  }
}
