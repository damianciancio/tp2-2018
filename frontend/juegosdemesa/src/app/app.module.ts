import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {BrowserXhr} from '@angular/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './../services/authenticationService/interceptor/authentication.interceptor';

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
  MatToolbarModule,
  MatInputModule
} from '@angular/material';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';

import { DeviceDetectorModule } from 'ngx-device-detector';

import { FormsModule } from '@angular/forms';

const appRoutes: Routes = [
  {
    path: 'groups/:id',
    component: GroupDetailsComponent,
    data: {
      title: "Grupo"
    }
  },
  {
    path: 'groups',
    component: GroupsListComponent,
    data: {
      title: "Mis grupos"
    }
  },
  {
    path: 'login', 
    component: LoginComponent,
    data: {
      title: "Iniciar sesión"
    }
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
    DeviceDetectorModule.forRoot(),
    MatInputModule,
    FormsModule
  ],
  providers: [

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmModalComponent]
})
export class AppModule { }
