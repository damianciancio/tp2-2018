import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from '../../services/backendService/backend-service.service';
import {GroupPreviewComponent} from './../group-preview/group-preview.component';
@Component({
  selector: 'groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {

  constructor(private back : BackendServiceService) { }
  groupList = null;
  ngOnInit() {
    var that = this;
    this.back.getPlayerGroups(this.back.currentPlayer)
    .subscribe((data: any)=> {
      console.log(data);
      that.groupList = data.groups;
    });
  }

}
