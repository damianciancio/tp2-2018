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
import { AcceptedMembersPipe } from './pipes/accepted-members.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatFormFieldModule, 
  MatButtonModule, 
  MatDialogModule,  
  MatListModule, 
  MatCardModule, 
  MatIconModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';

import { DeviceDetectorModule } from 'ngx-device-detector';

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
    LoginComponent,
    AcceptedMembersPipe,
    ConfirmModalComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    DeviceDetectorModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmModalComponent]
})
export class AppModule { }
