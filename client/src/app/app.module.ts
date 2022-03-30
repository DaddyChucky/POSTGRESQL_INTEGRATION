import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./modules/app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./communication.service";
import { AppMaterialModule } from './modules/material.module';
import { JardinsComponent } from './jardins/jardins.component';
import { VarietesComponent } from './varietes/varietes.component';
import { PlantesComponent } from './plantes/plantes.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogComponent } from "./jardins/dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    JardinsComponent,
    DialogComponent,
    VarietesComponent,
    PlantesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  providers: [CommunicationService],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
