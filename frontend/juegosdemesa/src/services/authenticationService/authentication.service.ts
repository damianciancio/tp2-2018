import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BackendServiceService } from '../backendService/backend-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate {

  constructor(private http : HttpClient, private router: Router){
   }
  private token : String;

  setToken(token) {
    localStorage.setItem("juegosmesa-jwt", token);
    this.token = token;
  }

  getToken() {
    if(!this.token){
      this.token = localStorage.getItem("juegosmesa-jwt");
    }

    return this.token;
  }

  logout() {
    this.token = '';
    window.localStorage.removeItem("juegosmesa-jwt");
    this.router.navigateByUrl('/login');
  }

  public getUserId() {
    var userDetails = this.getUserDetails();
    if (userDetails) {
      return userDetails._id;
    }
    return null;
  }

  public getUserDetails() {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }


  login(username, password) {
    var params = new HttpParams().set(
      'username', username).set("password", password);
    var app = this;
    let promise = this.http.post('/backend/api/register/login', params);
    promise.subscribe((data: any) => {
      app.setToken(data.token);
    });
    return promise;
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.isLoggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
