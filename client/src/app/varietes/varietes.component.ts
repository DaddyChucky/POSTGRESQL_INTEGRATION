import { Component, OnInit } from '@angular/core';
import { Variete } from '../../../../common/tables/Variete';
import { CommunicationService } from '../communication.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddVarieteComponent } from './add-variete.component';

@Component({
  selector: 'app-varietes',
  templateUrl: './varietes.component.html',
  styleUrls: ['./varietes.component.css', '../jardins/jardins.component.css']
})
export class VarietesComponent implements OnInit {
  varietes: Variete[];
  displayedColumns: string[] = ['nom', 'anneemiseenmarche', 'periodemiseenplace', 'perioderecolte', 'descriptionplantation', 'descriptionentretien', 'descriptionrecolte', 'commentairegeneral', 'actions'];

  constructor(public dialog: MatDialog, private readonly communicationService: CommunicationService) {}

  ngOnInit() {
    this.getAllVarietes();
  }

  openDialog(variete?: Variete) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '650px';
    this.dialog.open(AddVarieteComponent, dialogConfig);
  }

  splitDescription(descriptions: string, index: number) {
    return descriptions.replace('("', '').replace('")', '').split('","')[index];
  }

  private getAllVarietes(): void {
    this.communicationService.getAllVarietes().subscribe((varietes: Variete[]) => {
      this.varietes = varietes ? varietes : [];
    });
  }
}
