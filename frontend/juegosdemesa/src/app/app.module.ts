import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {BrowserXhr} from '@angular/http';

import { AppComponent } from './app.component';
import { GroupsListComponent } from './groups-list/groups-list.component';

const appRoutes: Routes = [
  {
    path: '', 
    component: AppComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    GroupsListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
