import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private authUser: AuthenticateService, 
              private alerty: AlertifyService,
              private router: Router) { }

  ngOnInit() {
  }

  onLogin(loginform: NgForm){
    console.log(loginform.value);
    const userToken = this.authUser.authenticateUser(loginform.value);
    if (userToken){
      localStorage.setItem('userToken', userToken.userName);
      this.alerty.successMsg("Login successfully");
      this.router.navigate(['/']);
    }else{
      this.alerty.warningMsg("Login not successful");
    }
  }
}
