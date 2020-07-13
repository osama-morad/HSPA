import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

constructor() { }

  authenticateUser(user: any){
    let users = [];
    if (localStorage.getItem('Users')){
      users = JSON.parse(localStorage.getItem('Users'));
      return users.find(p => p.userName === user.loginName && p.password === user.password);
    }
  }
}
