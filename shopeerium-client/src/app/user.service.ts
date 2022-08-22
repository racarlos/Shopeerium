import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private userUrl = `${environment.apiUrl}/users`;
  private assetsUrl = `${environment.apiUrl}/assets`;


  constructor(
    private http: HttpClient
  ) 
  {}

  getAssetsUrl(){
    return this.assetsUrl;
  }

  postUser(formdata: any){
    return this.http.post(`${this.userUrl}`,formdata);
  }

  getUserSelf() {
    return this.http.get(`${this.userUrl}/self`);
  }

  getUser(username: string){
    return this.http.get(`${this.userUrl}/${username}`);
  }

  getUsers(){
    return this.http.get(`${this.userUrl}`);
  }

}
