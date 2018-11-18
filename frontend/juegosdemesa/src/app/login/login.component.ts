import { Component, OnInit } from '@angular/core';
import { MatInput } from '@angular/material';
import { Form } from '@angular/forms';
import { AuthenticationService } from '../../services/authenticationService/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: String;
  password: String;

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  login(){
    var app = this;
    this.auth.login(this.user, this.password).subscribe((data:any) => {
      if(data){
        app.auth.setToken(data.token);
        app.router.navigateByUrl("/groups");
      }
    });
  }

}
