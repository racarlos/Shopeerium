import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class ShopService {

  private shopUrl = `${environment.apiUrl}/shops`;
  private assetsUrl = `${environment.apiUrl}/assets/shops`;

  
  constructor(
    private http: HttpClient,
  ) 
  { }

  getAssetsUrl(){
    return this.assetsUrl;
  }

  getShop(shopOwner: string){
    return this.http.get(`${this.shopUrl}/${shopOwner}`);
  };
  
  getShopSelf(){
    return this.http.get(`${this.shopUrl}/self`);
  };

  addShop(formdata : any){
    return this.http.post(`${this.shopUrl}`,formdata)
  }



}