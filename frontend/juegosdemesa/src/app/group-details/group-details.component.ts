import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendServiceService } from './../../services/backendService/backend-service.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {
  group : any;
  constructor(
    private route: ActivatedRoute,
    private back : BackendServiceService
  ) { }

  ngOnInit() {
    var component = this;
    var idGroup = this.route.snapshot.params.id;
    this.back.getOneGroup(idGroup).subscribe((group: any) => {
      component.group = group.group;
    });
  }

  acceptMember(member) {
    this.back.acceptGroupMember(this.group._id, member._id).subscribe((data)=>{
      if(data){
        member.status = 'accepted';
      }
    });
  }

}
