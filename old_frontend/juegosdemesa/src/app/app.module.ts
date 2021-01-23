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

import { AuthenticationService } from './../services/authenticationService/authentication.service';
import { GroupFormComponent } from './group-form/group-form.component';
import { PlayerSearchComponent } from './player-search/player-search.component';

const appRoutes: Routes = [
  {
    path: 'groups/new', 
    component: GroupFormComponent,
    data: {
      title: "Crear grupo"
    }
  },
  {
    path: 'groups/:id/edit', 
    component: GroupFormComponent,
    data: {
      title: "Editar grupo"
    }
  },
  {
    path: 'groups/:id',
    component: GroupDetailsComponent,
    data: {
      title: "Grupo"
    },
    canActivate: [AuthenticationService]
  },
  {
    path: 'groups',
    component: GroupsListComponent,
    data: {
      title: "Mis grupos"
    },
    canActivate: [AuthenticationService]
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
    ConfirmModalComponent,
    GroupFormComponent,
    PlayerSearchComponent
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
