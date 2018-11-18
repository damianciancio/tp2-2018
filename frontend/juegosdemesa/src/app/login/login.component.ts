import { Component, OnInit } from '@angular/core';
import { MatInput } from '@angular/material';
import { Form } from '@angular/forms';
import { BackendServiceService } from '../../services/backendService/backend-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: String;
  password: String;

  constructor(private back: BackendServiceService) { }

  ngOnInit() {
  }

  login(){
    this.back.login(this.user, this.password).subscribe((data:any) => {
        console.log(data);
    });
  }

}
