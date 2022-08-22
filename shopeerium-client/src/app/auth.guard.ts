import { Injectable } from '@angular/core';
import { CanActivate,Router} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor (
    private authService: AuthService,
    private router: Router
  ){}
  
  // Checks if the user is logged in to allow it to pass on a protected route
  canActivate(): boolean{
    const userLoggedIn = this.authService.isLoggedIn()
    if (userLoggedIn){
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
