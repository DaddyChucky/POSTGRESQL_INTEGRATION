import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component ({
  selector: 'dialog',
  templateUrl: './dialog.component.html',
})

export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}
