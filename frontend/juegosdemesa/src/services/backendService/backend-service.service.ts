import { Injectable } from '@angular/core';
import environment from './../../environments/environment';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BackendServiceService {

  constructor(private http: HttpClient) {

  }

  currentPlayer = "5bb8b496e63f55188eb7e11c";

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
}
