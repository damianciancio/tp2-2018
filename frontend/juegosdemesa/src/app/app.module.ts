import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {BrowserXhr} from '@angular/http';

import { AppComponent } from './app.component';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { GroupPreviewComponent } from './group-preview/group-preview.component';
import { GroupDetailsComponent } from './group-details/group-details.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  {
    path: 'groups/:id',
    component: GroupDetailsComponent
  },
  {
    path: 'groups',
    component: GroupsListComponent
  },
  {
    path: '', 
    component: AppComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    GroupsListComponent,
    GroupPreviewComponent,
    GroupDetailsComponent,
    LoginComponent
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
