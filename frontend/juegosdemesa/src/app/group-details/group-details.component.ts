import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendServiceService } from './../../services/backendService/backend-service.service';
import {ConfirmModalComponent} from './../modals/confirm-modal/confirm-modal.component';
import { MatDialog, MatDialogConfig, MatList, MatListItem, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatIcon, MatButton } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../../services/authenticationService/authentication.service';


@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {
  group : any;
  isGroupAdmin: boolean;
  constructor(
    private route: ActivatedRoute,
    private back : BackendServiceService,
    private dialog: MatDialog,
    private title: Title,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {
    var component = this;
    
    var idGroup = this.route.snapshot.params.id;
    this.back.getOneGroup(idGroup).subscribe((group: any) => {
      component.group = group.group;
      component.title.setTitle(component.group.name);
      this.isGroupAdmin = this.back.isCurrentPlayerAdmin(this.group);      
    });    
  }

  acceptMember(member) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      member: member
    }
    console.log(member);
    //this.dialog.open(ConfirmModalComponent, dialogConfig);
    const dialogRef = this.dialog.open(ConfirmModalComponent, dialogConfig);
    var app = this;
    dialogRef.afterClosed().subscribe(
        data => {
          if(typeof data != 'undefined' && data._id){
            app.back.acceptGroupMember(app.group._id, member._id).subscribe((data)=>{
              if(data){
                member.status = 'accepted';
              }
            });
          }
        }
    ); 

  }

}
