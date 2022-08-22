import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private url = `${environment.apiUrl}/upload`;

  constructor(
    private http: HttpClient
  ) { }

  uploadProductImage(formData: any){
    return this.http.post(`${this.url}/product`,formData);
  }

  uploadUserImage(formData: any){
    return this.http.post(`${this.url}/user`,formData);
  }

  uploadShopImage(formData: any){
    return this.http.post(`${this.url}/shop`,formData);
  }

}
