import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ReloadHeaderService } from '../reload-header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userIsLoggedIn:boolean = false;
  username: string = ""
  role: string = "";
  currentRoute: string = "";
  pattern: string = "";

  constructor(
    private router: Router, 
    private location: Location,
    private authService: AuthService,
    private reloadHeaderService: ReloadHeaderService
  ) 
  { 
    // When log in is clicked reload the component
    this.reloadHeaderService.getClickEvent()
    .subscribe(() =>{
      this.ngOnInit();
    })
  }

  public ngOnInit(): void {    

    // Get path to check currentroute to not display on login 
    this.router.events.subscribe((value) => {
      if(this.location.path() != ""){
        this.currentRoute = this.location.path();
      }
    })

    // Check if user is logged in to route to profile else route to login
    this.userIsLoggedIn = this.authService.isLoggedIn();
    this.role = String(localStorage.getItem("role"));
    this.username = String(localStorage.getItem("username"));
  }

  logoutUser(){
    this.authService.logoutUser();
    this.ngOnInit();
    this.router.navigate(['/']);
  }

  
  doSearch(){
    if(this.pattern && this.pattern.match(/^\s+$/) === null){
      this.pattern = this.pattern.trim();
      this.router.navigateByUrl(`/search?pattern=${this.pattern}`);
    }
  }

  enterSearch(event:KeyboardEvent ){
    if(event.keyCode === 13){
      this.doSearch();
    }
  }

}
