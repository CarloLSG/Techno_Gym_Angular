import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarContentComponent } from './shared/components/toolbar-content/toolbar-content.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { PageNotFoundComponent } from './public/pages/page-not-found/page-not-found.component';
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './marathon/pages/home/home.component';
import {MatCardModule} from "@angular/material/card";
import {ParticipantsService} from "./marathon/services/participants.service";
import {CentersService} from "./marathon/services/centers.service";
import { RecordsComponent } from './marathon/pages/records/records.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    ToolbarContentComponent,
    PageNotFoundComponent,
    HomeComponent,
    RecordsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule
  ],
  providers: [ParticipantsService, CentersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
