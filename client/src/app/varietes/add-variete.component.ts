import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from "../../../../common/communication/dialog-data";
// import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
// import {default as _rollupMoment, Moment} from 'moment';
import * as _moment from 'moment';
// import { DateAdapter } from "@angular/material";
// import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
// const moment = _rollupMoment || _moment;

@Component ({
  selector: 'AddVarieteComponent',
  templateUrl: './add-variete.component.html',
  styleUrls: ['./add-variete.component.css', '../jardins/dialog.component.css']})
//   providers:[    {
//     provide: DateAdapter,
//     useClass: MomentDateAdapter,
//     deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
//   },

//   {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
// ],]
// })

export class AddVarieteComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  // date = new FormControl(moment());

  constructor(private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddVarieteComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required],
      fourthCtrl: ['', Validators.required],
    });
  }



  // setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
  //   const ctrlValue = this.date.value;
  //   ctrlValue.month(normalizedMonthAndYear.month());
  //   ctrlValue.year(normalizedMonthAndYear.year());
  //   this.date.setValue(ctrlValue);
  //   datepicker.close();
  // }
}
