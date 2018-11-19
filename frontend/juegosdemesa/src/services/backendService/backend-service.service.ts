import { Injectable, OnInit } from '@angular/core';
import environment from './../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../authenticationService/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

  constructor(
    private http: HttpClient,
    private auth: AuthenticationService
  ) {

  }
  currentPlayer = "5bb8b484e63f55188eb7e11b";
  player = null;

  ngOnInit(){
    
  }
  
  setCurrentPlayer() {
    var ser = this;
    this.getOnePlayer(this.currentPlayer).subscribe((data: any) => {
      ser.player = data.player;
    });
  }

  getOnePlayer(id) {
    return this.http.get('/backend/api/players/'+id);
  }

  getPlayerGroups(id) {
    return this.http.get('/backend/api/players/'+id+'/groups');
  }

  getPlayerGroupsAsAdmin(id) {
    return this.http.get('/backend/api/players/'+id+'/groups?admin=true');
  }

  getGroupMembers(id) {
    return this.http.get('/backend/api/groups/'+id+'/members');
  }

  getOneGroup(id) {
    return this.http.get('/backend/api/groups/'+id);
  }

  acceptGroupMember(idGroup, idMember) {
    var params = new HttpParams().set(
      'newStatus', "accepted");
    return this.http.put('/backend/api/groups/'+idGroup+'/members/'+idMember,params);
  }

  isCurrentPlayerAdmin(group) {
    var ser = this;
    let member = group.members.find(member => {
      let pid = member.player;
      if(typeof member.player != "string"){
        pid = member.player._id;
      }
      if(pid == ser.auth.getUserId()){
        return true;
      }
      return false;
    });

    return member.is_admin;
  }

}
