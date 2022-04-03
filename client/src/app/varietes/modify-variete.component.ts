import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from "../../../../common/communication/dialog-data";
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatDatepicker } from "@angular/material/datepicker";
import * as moment from "moment";
import { CommunicationService } from "../communication.service";
import { Variete } from "../../../../common/tables/Variete";
import { Semencier } from "../../../../common/tables/Semencier";
import { AdaptationTypeSolVariete } from '../../../../common/tables/AdaptationTypeSolVariete';
import { PendingQueryComponent } from "./pending-query.component";
import { Production } from '../../../../common/tables/Production';

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
  selector: 'ModifyVarieteComponent',
  templateUrl: './modify-variete.component.html',
  styleUrls: ['./modify-variete.component.css', './add-variete.component.css', '../jardins/dialog.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})

export class ModifyVarieteComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
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
  bio: boolean = false;
  nomSemencier: string = '';
  adaptation: string = '';
  varietes: Variete[];
  semenciers: Semencier[];
  adaptations: AdaptationTypeSolVariete[];
  productions: Production[];
  placeholderMP: boolean = false;
  placeholderPR: boolean = false;
  placeholderMEP: boolean = false;
  pending: boolean = true;
  success: boolean = false;
  private deepSaveNomVariete: string = '';

  constructor(public dialog: MatDialog, private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<ModifyVarieteComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private readonly communicationService: CommunicationService) {}

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
    this.fifthFormGroup = this._formBuilder.group({
      eleventhCtrl: ['', Validators.required],
      twelfthCtrl: ['', Validators.required],
    });
    this.sixthFormGroup = this._formBuilder.group({
      thirtheenthCtrl: ['', Validators.required],
    });
    this.getAllVarietes();
    this.getAllSemencier();
    this.getAllProductions();
    this.getAllAdaptationTypeSolVariete();
  }

  loadValues(): void {
    if (!this.data || !this.data.variete) return;
    for (const variete of this.varietes) {
      if (variete.nom === this.data.variete.nom) {
        this.nomVariete = this.data.variete.nom;
        this.deepSaveNomVariete = this.data.variete.nom;
        this.commentaire = this.data.variete.commentairegeneral;
        const descriptions: string[] = this.data.variete.description.replace('("', '').replace('")', '').split('","');
        this.plantation = descriptions[0];
        this.entretien = descriptions[1];
        this.recolte = descriptions[2];
        this.miseEnPlaceStart = '01/01/2022'; // TODO : FIX DATA
        this.miseEnPlaceEnd = '01/01/2023'; // TODO : FIX DATA
        this.periodeRecolteStart = '01/01/2024'; // TODO : FIX DATA
        this.periodeRecolteEnd = '01/01/2025'; // TODO : FIX DATA
        this.anneeMiseEnMarche = new Date(this.data.variete.anneemiseenmarche).getFullYear().toString();
        const ctrlValue = this.date.value;
        ctrlValue.day(new Date('1'));
        ctrlValue.month(new Date('1'));
        ctrlValue.year(Number(this.anneeMiseEnMarche));
        this.date.setValue(ctrlValue);
        break;
      }
    }
    for (const production of this.productions) {
      if (production.nomvariete === this.data.variete.nom) {
        this.bio = production.produitbio;
        this.nomSemencier = production.nomsemencier;
      }
    }
    for (const adaptation of this.adaptations) {
      if (adaptation.nomvariete === this.data.variete.nom) {
        this.adaptation = adaptation.adaptationtypesol;
        break;
      }
    }
    this.placeholderMP = true;
    this.placeholderPR = true;
    this.placeholderMEP = false;
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '650px';
    dialogConfig.data = {
      pending: this.pending,
      success: this.success,
      update: true
    };
    this.dialog.closeAll();
    this.dialog.open(PendingQueryComponent, dialogConfig);
  }

  modifyVariete(): void {
    this.openDialog();
    const sep = "##//##";
    this.communicationService.updateVariete({
      nom: this.nomVariete,
      anneemiseenmarche: new Date(this.anneeMiseEnMarche),
      description: this.plantation + sep +  this.entretien + sep + this.recolte,
      periodemiseenplace: this.convertToDate(this.miseEnPlaceStart) + ' au ' +  this.convertToDate(this.miseEnPlaceEnd),
      perioderecolte: this.convertToDate(this.periodeRecolteStart) + ' au ' +  this.convertToDate(this.periodeRecolteEnd),
      commentairegeneral: this.commentaire,
      oldvarietename: this.deepSaveNomVariete
    } as Variete).subscribe((res: number) => {
      if (res !== -1) {
        this.success = true;
      }
      this.pending = false;
      this.openDialog();
    });
    this.pending = true;
    this.success = false;
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

  printBio(): string {
    return this.bio ? "oui" : "non";
  }

  private getAllVarietes(): void {
    this.communicationService.getAllVarietes().subscribe((varietes: Variete[]) => {
      this.varietes = varietes ? varietes : [];
    });
  }

  private getAllSemencier(): void {
    this.communicationService.getAllSemencier().subscribe((semenciers: Semencier[]) => {
      this.semenciers = semenciers ? semenciers : [];
    });
  }

  private getAllAdaptationTypeSolVariete(): void {
    this.communicationService.getAllAdaptationTypeSolVariete().subscribe((adaptations: AdaptationTypeSolVariete[]) => {
      this.adaptations = adaptations ? adaptations : [];
      this.loadValues();
    });
  }

  private getAllProductions(): void {
    this.communicationService.getAllProduction().subscribe((productions: Production[]) => {
      this.productions = productions ? productions : [];
    });
  }
}
