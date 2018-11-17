import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from './../services/backendService/backend-service.service';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { MatSidenav,MatSidenavContainer, MatSidenavContent, MatList, MatToolbar } from '@angular/material';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private back: BackendServiceService, private deviceDetector: DeviceDetectorService) {

  }
  title = 'app';
  showMenuButton = false;
  sidenavMode = "side";
  ngOnInit(){
    this.back.getOnePlayer("5bb8b484e63f55188eb7e11b").subscribe((data: any) =>{
      console.log(data);
    });

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
