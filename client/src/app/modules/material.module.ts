import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const modules = [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    MatSliderModule,
    MatButtonModule,
];

@NgModule({
    imports: [...modules],
    exports: [...modules],
    providers: [],
})
export class AppMaterialModule {}
