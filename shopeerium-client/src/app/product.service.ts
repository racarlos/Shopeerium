import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private url = `${environment.apiUrl}/products`;
  private assetsUrl = `${environment.apiUrl}/assets`;


  updatedProduct = this.socket.fromEvent<any>('Updated Product');
  checkedOutProduct = this.socket.fromEvent<any>('Checked-out Product');


  constructor(
    private http: HttpClient,
    private socket: Socket
  )
  { }

    // Returns observable of the list of all products
    getProducts() {
      //this.socket.emit('Getting Products');
      return this.http.get(`${this.url}`);
    }

    // Returns observable of a single product
    getProduct(productId: number){
      return this.http.get(`${this.url}/${productId}`);
    }

    addProduct(newProduct: any){
      return this.http.post(`${this.url}`,newProduct)
    }

    updateProduct(updatedProduct: any){
      this.socket.emit('Updating Product', updatedProduct);
      return this.http.put(`${this.url}/${updatedProduct.productId}`,updatedProduct);
    }

    deleteProduct(productId: number){
      return this.http.delete(`${this.url}/${productId}`);
    }

    getProductByCategory(category: string){
      return this.http.get(`${this.url}?category=${category}`);
    }

    getProductBySeller(seller: string){
      return this.http.get(`${this.url}?sellerUsername=${seller}`);
    }

    searchProducts(pattern: string){
      return this.http.get(`${this.url}/search?pattern=${pattern}`);
    }

    getAssetsUrl(){
      return this.assetsUrl;
    }


}
