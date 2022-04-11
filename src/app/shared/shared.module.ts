import { NgModule } from "@angular/core";

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';

import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { CommonModule } from "@angular/common";
import { LoadingComponent } from './loading/loading.component';
import { MatNativeDateModule } from "@angular/material/core";
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations : [
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    NotFoundComponent
  ],
  imports:[
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatSelectModule
  ],
  exports : [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    HeaderComponent,
    FooterComponent,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    LoadingComponent,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatSelectModule,
    NotFoundComponent
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'fill'}},
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ]
})
export class SharedModule{}
