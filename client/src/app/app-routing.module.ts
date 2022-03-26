import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./app.component";
import { JardinsComponent } from './jardins/jardins.component';
import { PlantesComponent } from './plantes/plantes.component';
import { VarietesComponent } from './varietes/varietes.component';

const routes: Routes = [
  { path: "app", component: AppComponent },
  { path: "jardins", component: JardinsComponent },
  { path: "plantes", component: PlantesComponent },
  { path: "varietes", component: VarietesComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
