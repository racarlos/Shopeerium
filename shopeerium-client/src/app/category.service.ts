import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryUrl: string = `${environment.apiUrl}/categories`;
  private assetsUrl:string = `${environment.apiUrl}/assets`;

  constructor(
    private http: HttpClient,
  ) { }

  getAssetsUrl(){
    return this.assetsUrl;
  }

  // Returns observable of the list of categories encapsulated in objects
  // categories": [{"category": "Toys"},{"category": "Tools"}]

  getCategories(){
    return this.http.get(`${this.categoryUrl}`);
  }

  // Sample URL of getting categories of a product
  getCategoryOfProduct(productId: number){
    return this.http.get(`${this.categoryUrl}?productId=${productId}`);
  }



  
}
