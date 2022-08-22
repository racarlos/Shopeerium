import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ReloadHeaderService } from '../reload-header.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  message: string = "";       // modifies upper div for conditions (tampered token, timeout)
  loginUserData: any = {}
  invalidCredentials: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private reloadHeaderService: ReloadHeaderService
  ) 
  { }

  ngOnInit(): void {
    this.checkIfLoggedIn();
  }

  loginUser() {

    this.authService.loginUser(this.loginUserData)
    .subscribe(
      res => {
        console.log(res);
        localStorage.setItem('username',res.username);
        localStorage.setItem('role',res.role);
        localStorage.setItem('accessToken',res.accessToken);  // set local storage items 

        this.router.navigate(['/']);                          // go back to dashboard 
        this.reloadHeaderService.sendClickEvent();
      },
      error => {
        console.log(error)
        if(error instanceof HttpErrorResponse){
          if(error.status === 403){
            this.invalidCredentials = true;
          }
        }
      }
    )
  }

  checkIfLoggedIn(): void{
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/']);
    }
  }


}
