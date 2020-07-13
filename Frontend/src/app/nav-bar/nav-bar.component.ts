import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  loggedInUserName: string;
  constructor() { }

  ngOnInit() {
    
  }

  loggedInUser(){
    this.loggedInUserName = localStorage.getItem('userToken');
    // console.log(this.loggedInUserName);
    return this.loggedInUserName;
  }
  onLogout(){
    localStorage.removeItem('userToken');
  }
}
