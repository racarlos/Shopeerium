import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private loginUrl = `${environment.apiUrl}/auth/login`
  private registerUrl = `${environment.apiUrl}/auth/register`

  constructor(
    private http: HttpClient
  ) 
  { }

  registerUser(user: any){
    return this.http.post(this.registerUrl,user);
  }

  loginUser(loginUserData: any){
    return this.http.post<any>(this.loginUrl, loginUserData);
  }

  // Sends token if it exists, sends false if not 
  isLoggedIn(){
    if(localStorage.getItem('accessToken')){
      return true;
    } 
    return false;
  }

  getAccessToken(){
    return localStorage.getItem('accessToken');
  }

  logoutUser(){
    return localStorage.clear();
  }
}
