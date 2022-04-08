import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Plante } from '../../../../common/tables/Plante';
import { CommunicationService } from '../services/communication.service';

@Component({
  selector: 'app-plantes',
  templateUrl: './plantes.component.html',
  styleUrls: ['./plantes.component.css', '../jardins/dialog.component.css']
})
export class PlantesComponent implements OnInit {
  myControl = new FormControl();
  plantesNames: string[] = [];
  currentPlantes: Plante[];
  plantes: Plante[];
  filteredOptions: Observable<string[]>;
  isActive = false;

  constructor(private readonly communicationService: CommunicationService) {}

  ngOnInit() {
    this.getAllPlantes();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value)),
    );
  }

  switchToActive(): void {
    this.isActive = true;
  }

  private getAllPlantes(): void {
    this.communicationService.getAllPlantes().subscribe((plantes: Plante[]) => {
      this.plantes = plantes ? plantes : [];
      this.convertPlantesToPlantesNames();
    });
  }

  private convertPlantesToPlantesNames(): void {
    this.plantes.forEach((plante: Plante) => {
      this.plantesNames.push(plante.nom);
      this.plantesNames.push(plante.nomlatin);
    })
  }

  private filter(plante: string): string[] {
    const plantesNames: string[] = this.plantesNames.filter(plante_ => plante_.toLowerCase().includes(plante.toLowerCase()));
    this.currentPlantes = this.plantes ? this.plantes.filter((plante_: Plante) => plantesNames.find((planteName: string) => planteName === plante_.nom || planteName === plante_.nomlatin)) : [];
    return plantesNames;
  }
}
