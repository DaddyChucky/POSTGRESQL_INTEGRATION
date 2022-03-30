import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

const modules = [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSliderModule,
    MatDialogModule,
    MatDividerModule,
    MatCardModule
];

@NgModule({
    imports: [...modules],
    exports: [...modules],
    providers: [],
})
export class AppMaterialModule {}
