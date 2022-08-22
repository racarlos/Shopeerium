import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user?: User;
  assetsUrl: string = "";
  
  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAssetsUrl();
    this.getUser()
  }

  getAssetsUrl(): void{
    this.assetsUrl = this.userService.getAssetsUrl();
  }

  getUser(): void{
    this.userService.getUserSelf()
    .subscribe(
    (data: any) => {
      let newUser = {
        username: data.user.username,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        number: Number(data.user.number),
        imgUrl: String(data.user.imgUrl),
        role: data.user.role,
        email: data.user.email,
        password: data.user.password
      }

      this.user = newUser;
      console.log(this.user);
      console.log("Finished Getting UserData for Profile Component");
    },
    (error) => {
      // If token is expired or tampered redirect to login
      if(error instanceof HttpErrorResponse){
        if(error.status === 401){           
          console.log(error)
          this.router.navigate(['/login']);     // For future, replace with error page component
        }                                       // displays error and has button that redirects to login
      }
    })
  }

}
