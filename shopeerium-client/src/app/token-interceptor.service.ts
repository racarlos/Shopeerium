import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable()
export class TokenInterceptorService implements HttpInterceptor{

  constructor(
    private authService: AuthService
  ) { }

  intercept(req: any,next: any ){
    
    const accessToken = this.authService.getAccessToken()
    
    // Puts the JWT into Authorization Header, format; authorization: Bearer [JWT]
    let tokenizedRequest = req.clone({
      setHeaders: {
        authorization: `Bearer ${accessToken}`
      }
    })

    return next.handle(tokenizedRequest);
  }
}
