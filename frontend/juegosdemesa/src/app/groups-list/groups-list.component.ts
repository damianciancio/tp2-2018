import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from '../../services/backendService/backend-service.service';

@Component({
  selector: 'groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {

  constructor(private back : BackendServiceService) { }

  ngOnInit() {
    this.back.getGroupMembers("5bc7bcb1cb5742179da9f4bb")
    .subscribe((data: any)=> {
      console.log(data);
    });
  }

}
