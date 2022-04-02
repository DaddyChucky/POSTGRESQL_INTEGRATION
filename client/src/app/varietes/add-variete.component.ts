import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from "../../../../common/communication/dialog-data";
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatDatepicker } from "@angular/material/datepicker";
import * as moment from "moment";

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'DD MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'DD MMMM YYYY',
  },
};

@Component ({
  selector: 'AddVarieteComponent',
  templateUrl: './add-variete.component.html',
  styleUrls: ['./add-variete.component.css', '../jardins/dialog.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class AddVarieteComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  date = new FormControl(moment());
  nomVariete: string = '';
  miseEnPlaceStart: string = '';
  miseEnPlaceEnd: string = '';
  periodeRecolteStart: string = '';
  periodeRecolteEnd: string = '';
  anneeMiseEnPlace: string = '';
  plantation: string = '';
  entretien: string = '';
  recolte: string = '';

  constructor(private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddVarieteComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      thirdCtrl: ['', Validators.required],
      fourthCtrl: ['', Validators.required],
      fifthCtrl: ['', Validators.required],
      sixthCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      seventhCtrl: ['', Validators.required],
      eigthCtrl: ['', Validators.required],
      ninthCtrl: ['', Validators.required],
    });
  }

  setYear(normalizedMonthAndYear: moment.Moment, datepicker: MatDatepicker<moment.Moment>): void {
    datepicker.close();
    const ctrlValue = this.date.value;
    ctrlValue.day(normalizedMonthAndYear.day());
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    this.anneeMiseEnPlace = normalizedMonthAndYear.year().toString();
  }

  convertToDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.getDate().toString() + '/' + date.getMonth().toString() + '/' + date.getFullYear().toString();
  }

  randomizer(): void {

  }
}
