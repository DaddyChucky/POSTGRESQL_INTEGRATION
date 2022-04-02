import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from "../../../../common/communication/dialog-data";
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatDatepicker } from "@angular/material/datepicker";
import * as moment from "moment";
import { CommunicationService } from "../communication.service";
import { Variete } from "../../../../common/tables/Variete";

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
  fourthFormGroup: FormGroup;
  date = new FormControl(moment());
  nomVariete: string = '';
  miseEnPlaceStart: string = '';
  miseEnPlaceEnd: string = '';
  periodeRecolteStart: string = '';
  periodeRecolteEnd: string = '';
  anneeMiseEnMarche: string = '';
  plantation: string = '';
  entretien: string = '';
  recolte: string = '';
  commentaire: string = '';
  varietes: Variete[];
  placeholderMP: boolean = false;
  placeholderPR: boolean = false;
  placeholderMEP: boolean = false;

  constructor(private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddVarieteComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private readonly communicationService: CommunicationService) {}

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
    this.fourthFormGroup = this._formBuilder.group({
      tenthCtrl: ['', Validators.required],
    });
    this.getAllVarietes();
  }

  setYear(normalizedMonthAndYear: moment.Moment, datepicker: MatDatepicker<moment.Moment>): void {
    datepicker.close();
    const ctrlValue = this.date.value;
    ctrlValue.day(new Date('1'));
    ctrlValue.month(new Date('1'));
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    this.anneeMiseEnMarche = normalizedMonthAndYear.year().toString();
  }

  convertToDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.getDate().toString() + '/' + date.getMonth().toString() + '/' + date.getFullYear().toString();
  }

  resetPlaceHolderMP(): void {
    this.placeholderMP = false;
  }

  resetPlaceHolderPR(): void {
    this.placeholderPR = false;
  }

  resetPlaceHolderMEP(): void {
    this.placeholderMEP = false;
  }

  resetAnneeMiseMarche(): void {
    this.anneeMiseEnMarche = '';
  }

  randomizer(): void {
    if (!this.varietes) return;
    const rdEntry: Variete = this.varietes[this.getRandomIndex(this.varietes.length)];
    const descriptions: string[] = rdEntry.description.replace('("', '').replace('")', '').split('","');
    this.nomVariete = rdEntry.nom;
    this.miseEnPlaceStart = '01/01/2022'; // TODO : FIX DATA
    this.miseEnPlaceEnd = '01/01/2023';
    this.periodeRecolteStart = '01/01/2024';
    this.periodeRecolteEnd = '01/01/2025';
    this.anneeMiseEnMarche = new Date(rdEntry.anneemiseenmarche).getFullYear().toString();
    const ctrlValue = this.date.value;
    ctrlValue.day(new Date('1'));
    ctrlValue.month(new Date('1'));
    ctrlValue.year(Number(this.anneeMiseEnMarche));
    this.date.setValue(ctrlValue);
    this.plantation = descriptions[0];
    this.entretien = descriptions[1];
    this.recolte = descriptions[2];
    this.commentaire = rdEntry.commentairegeneral;
    this.placeholderMP = true;
    this.placeholderPR = true;
    this.placeholderMEP = true;
  }

  private getRandomIndex(tableSizeCeil: number): number {
    return Math.floor(Math.random() * (tableSizeCeil - 1));
  }

  private getAllVarietes(): void {
    this.communicationService.getAllVarietes().subscribe((varietes: Variete[]) => {
      this.varietes = varietes ? varietes : [];
    });
  }
}
