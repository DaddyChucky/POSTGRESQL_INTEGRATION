import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Variete } from '../../../../common/tables/Variete';
import { CommunicationService } from '../services/communication.service';
import { AddVarieteComponent } from './add-variete.component';
import { DeleteVarieteComponent } from './delete-variete.component';
import { ModifyVarieteComponent } from './modify-variete.component';

@Component({
  selector: 'app-varietes',
  templateUrl: './varietes.component.html',
  styleUrls: ['./varietes.component.css', '../jardins/jardins.component.css']
})
export class VarietesComponent implements OnInit {
  varietes: Variete[];
  displayedColumns: string[] = ['nom', 'anneemiseenmarche', 'periodemiseenplace', 'perioderecolte', 'descriptionplantation', 'descriptionentretien', 'descriptionrecolte', 'commentairegeneral', 'actions'];
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(public dialog: MatDialog, private readonly communicationService: CommunicationService) {}

  ngOnInit() {
    this.getAllVarietes();
  }

  sortData(sort: Sort): void {
    this.doSort(sort.direction);
    this.table.renderRows();
  }

  openModifyDialog(variete: Variete) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '650px';
    dialogConfig.maxWidth = '650px';
    dialogConfig.data = {
      variete
    };
    this.dialog.open(ModifyVarieteComponent, dialogConfig);
  }

  openDeleteDialog(variete: Variete) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '650px';
    dialogConfig.maxWidth = '650px';
    dialogConfig.data = {
      variete
    };
    this.dialog.open(DeleteVarieteComponent, dialogConfig);
  }

  openAddDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '650px';
    dialogConfig.maxWidth = '650px';
    this.dialog.open(AddVarieteComponent, dialogConfig);
  }

  splitDescription(descriptions: string, index: number) {
    descriptions = descriptions.split('"""').join('"');
    return descriptions.replace('("', '').replace('")', '').split('","')[index];
  }

  private doSort(dir: string): void {
    switch(dir) {
      case 'asc':
        this.varietes.sort((a: Variete, b: Variete) => a.nom.toLowerCase() < b.nom.toLowerCase() ? 1 : -1)
        break;
      default:
        this.varietes.sort((a: Variete, b: Variete) => a.nom.toLowerCase() < b.nom.toLowerCase() ? -1 : 1)
      }
  }

  private getAllVarietes(): void {
    this.communicationService.getAllVarietes().subscribe((varietes: Variete[]) => {
      this.varietes = varietes ? varietes : [];
      this.doSort('desc');
    });
  }
}
