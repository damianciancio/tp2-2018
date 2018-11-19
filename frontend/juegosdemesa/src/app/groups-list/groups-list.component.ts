import { Component, OnInit } from '@angular/core';
import { BackendServiceService } from '../../services/backendService/backend-service.service';
import {GroupPreviewComponent} from './../group-preview/group-preview.component';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authenticationService/authentication.service';
@Component({
  selector: 'groups-list',
  templateUrl: './groups-list.component.html',
  styleUrls: ['./groups-list.component.css']
})
export class GroupsListComponent implements OnInit {

  constructor(
    private back : BackendServiceService, 
    private route: ActivatedRoute, 
    private title: Title,
    private auth: AuthenticationService
  ) { }
  groupList = null;
  ngOnInit() {
    var that = this;
    this.title.setTitle(this.route.snapshot.data.title);
    this.back.getPlayerGroups(this.auth.getUserId())
    .subscribe((data: any)=> {
      console.log(data);
      that.groupList = data.groups;
    });
  }

}
