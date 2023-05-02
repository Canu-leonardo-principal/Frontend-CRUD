import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';//questo è molto importante per il funzionamento
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyTableComponent } from './my-table/my-table.component';
import { MatTableModule } from '@angular/material/table';
import {ReactiveFormsModule} from "@angular/forms";
import { EditButtonComponent } from './edit-button/edit-button.component'; 

@NgModule({
  declarations: [
    AppComponent,
    MyTableComponent,
    EditButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,// ovviamente anche questo è molto importante per il funzionamento
    MatTableModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
