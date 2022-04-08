import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogData } from "../../../../common/communication/dialog-data";
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { MatDatepicker } from "@angular/material/datepicker";
import * as moment from "moment";
import { CommunicationService } from "../services/communication.service";
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
  fifthFormGroup: FormGroup;
  sixthFormGroup: FormGroup;
  date = new FormControl(moment());
  nomVariete: string = '';
  miseEnPlaceStart: Date;
  miseEnPlaceEnd: Date;
  periodeRecolteStart: Date;
  periodeRecolteEnd: Date;
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
  placeholderMP: boolean = false;
  placeholderPR: boolean = false;
  placeholderMEP: boolean = false;
  pending: boolean = true;
  success: boolean = false;
  prodInsertError: boolean = false;
  adaptInsertError: boolean = false;

  constructor(public dialog: MatDialog, private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddVarieteComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData, private readonly communicationService: CommunicationService) {}

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
    this.getAllAdaptationTypeSolVariete();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '650px';
    dialogConfig.data = {
      pending: this.pending,
      success: this.success,
      prodInsertError: this.prodInsertError,
      adaptInsertError: this.adaptInsertError
    };
    this.dialog.closeAll();
    this.dialog.open(PendingQueryComponent, dialogConfig);
  }

  addVariete(): void {
    this.openDialog();
    const sep = "##//##";
    this.communicationService.insertVariete({
      nom: this.nomVariete,
      anneemiseenmarche: new Date(this.anneeMiseEnMarche),
      description: this.plantation + sep +  this.entretien + sep + this.recolte,
      periodemiseenplace: this.convertToDate(this.miseEnPlaceStart.toString()) + ' au ' +  this.convertToDate(this.miseEnPlaceEnd.toString()),
      perioderecolte: this.convertToDate(this.periodeRecolteStart.toString()) + ' au ' +  this.convertToDate(this.periodeRecolteEnd.toString()),
      commentairegeneral: this.commentaire
    } as Variete).subscribe((resInsVar: number) => {
      if (resInsVar !== -1) {
        this.communicationService.insertAdaptation({
          adaptationtypesol: this.adaptation,
          nomvariete: this.nomVariete
        } as AdaptationTypeSolVariete).subscribe((resInsAdapt: number) => {
          if (resInsAdapt !== -1) {
            this.communicationService.insertProduction({
              nomvariete: this.nomVariete,
              nomsemencier: this.nomSemencier,
              produitbio: this.bio
            } as Production).subscribe((resInsProd: number) => {
              if (resInsProd !== -1) {
                this.success = true;
              } else {
                this.prodInsertError = true;
              }
            });
          } else {
            this.adaptInsertError = true;
          }
        })
      }
      setTimeout(() => {
        this.pending = false;
        this.openDialog();
      }, 500);
    });
  }

  getSetOfNomsSemenciers(): Set<string> | undefined {
    if (!this.semenciers) return;
    const setOfNomsSemenciers: Set<string> = new Set<string>();
    this.semenciers.forEach((semencier: Semencier) => setOfNomsSemenciers.add(semencier.nom));
    return setOfNomsSemenciers;
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
    const rdEntryVariete: Variete = this.varietes[this.getRandomIndex(this.varietes.length)];
    const rdEntrySemencier: Semencier = this.semenciers[this.getRandomIndex(this.semenciers.length)];
    const rdEntryAdaptation: AdaptationTypeSolVariete = this.adaptations[this.getRandomIndex(this.adaptations.length)];
    const descriptions: string[] = rdEntryVariete.description.replace('("', '').replace('")', '').split('","');
    this.nomVariete = rdEntryVariete.nom;
    const periodeMiseEnPlace: string[] = rdEntryVariete.periodemiseenplace.split(' au ');
    this.miseEnPlaceStart = this.printDate(periodeMiseEnPlace[0]);
    this.miseEnPlaceEnd = this.printDate(periodeMiseEnPlace[1]);
    const periodeRecolte: string[] = rdEntryVariete.perioderecolte.split(' au ');
    this.periodeRecolteStart = this.printDate(periodeRecolte[0]);
    this.periodeRecolteEnd = this.printDate(periodeRecolte[1]);
    this.anneeMiseEnMarche = new Date(rdEntryVariete.anneemiseenmarche).getFullYear().toString();
    const ctrlValue = this.date.value;
    ctrlValue.day(new Date('1'));
    ctrlValue.month(new Date('1'));
    ctrlValue.year(Number(this.anneeMiseEnMarche));
    this.date.setValue(ctrlValue);
    this.plantation = descriptions[0].split('""').join('');
    this.entretien = descriptions[1].split('""').join('');
    this.recolte = descriptions[2].split('""').join('');
    this.commentaire = rdEntryVariete.commentairegeneral;
    this.nomSemencier = rdEntrySemencier.nom;
    this.bio = Math.random() > 0.5;
    this.placeholderMP = true;
    this.placeholderPR = true;
    this.placeholderMEP = true;
    this.adaptation = rdEntryAdaptation.adaptationtypesol;
  }

  printDate(periodeMiseEnPlace: string): Date {
    const startPeriodeMiseEnPlace: string[] = periodeMiseEnPlace.split('/');
    return new Date(Number(startPeriodeMiseEnPlace[2]), Number(startPeriodeMiseEnPlace[1]), Number(startPeriodeMiseEnPlace[0]));
  }

  printBio(): string {
    return this.bio ? "oui" : "non";
  }

  private getRandomIndex(tableSizeCeil: number): number {
    return Math.floor(Math.random() * tableSizeCeil);
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
    });
  }
}
