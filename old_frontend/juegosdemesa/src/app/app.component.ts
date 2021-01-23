import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from './../services/backendService/backend-service.service';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { MatSidenav,MatSidenavContainer, MatSidenavContent, MatList, MatToolbar } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private back: BackendServiceService, private deviceDetector: DeviceDetectorService, private title: Title) {

  }

  showMenuButton = false;
  sidenavMode = "side";
  ngOnInit(){

    this.back.setCurrentPlayer();

    if(this.deviceDetector.isMobile()) {
      this.sidenavMode = "over";
      this.showMenuButton = true;
    }
  }

  toggleNavigation(sidenav) {
    if (sidenav.opened) {
      this.showMenuButton = true;
    } else {
      this.showMenuButton = false;      
    }
    sidenav.toggle();
  }
}
