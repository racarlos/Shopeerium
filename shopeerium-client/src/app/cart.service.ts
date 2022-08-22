import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartUrl:string  = `${environment.apiUrl}/carts`
  private assetsUrl:string = `${environment.apiUrl}/assets`;

  updatedProduct = this.socket.fromEvent<any>('Updated Product');
  checkedOutProduct = this.socket.fromEvent<any>('Checked-out Product');

  constructor(
    private http: HttpClient,
    private socket: Socket
  ) 

  {} 

  getAssetsUrl(){
    return this.assetsUrl;
  }
  
  getCartSelf(){
    return this.http.get(`${this.cartUrl}/self`);
  }

  checkOutCarts(payload: any){
    this.socket.emit('Checking-out Product', payload);
    return this.http.post(`${this.cartUrl}/checkout`,payload);
  }

  addToCart(cart: any){
    return this.http.post(this.cartUrl,cart);
  }

  removeCart(productId: number){
    return this.http.delete(`${this.cartUrl}/${productId}`);
  }

}
