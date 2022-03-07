import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import { MaterialExampleModule } from '../material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroEditComponent } from './hero-edit/hero-edit.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component'; // <-- NgModel lives here

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { AddHeroComponent } from './add-hero/add-hero.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerComponent } from './spinner/spinner.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';


const modules = [
  MatButtonModule,
  MatNativeDateModule,
  BrowserModule,
  AppRoutingModule,
  FormsModule,
  ReactiveFormsModule,
  MaterialExampleModule,
  HttpClientModule,
  FontAwesomeModule,

  // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
  // and returns simulated server responses.
  // Remove it when a real server is ready to receive requests.
  HttpClientInMemoryWebApiModule.forRoot(
    InMemoryDataService, { dataEncapsulation: false }
  ),

  BrowserAnimationsModule
];


@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroEditComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    AddHeroComponent,
    SpinnerComponent,
    HeroDetailComponent
  ],
  imports: [modules],
  exports: [modules],
  providers: [HeroesComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
