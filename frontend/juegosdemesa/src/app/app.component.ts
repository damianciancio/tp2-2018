import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from './../services/backendService/backend-service.service';
import { GroupsListComponent } from './groups-list/groups-list.component';
import { MatSidenav,MatSidenavContainer, MatSidenavContent, MatList } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private back: BackendServiceService) {
  }
  title = 'app';
  showMenuButton = false;
  ngOnInit(){
    this.back.getOnePlayer("5bb8b484e63f55188eb7e11b").subscribe((data: any) =>{
      console.log(data);
    });
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
