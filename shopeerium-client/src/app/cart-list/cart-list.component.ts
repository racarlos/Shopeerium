import { Component, OnInit, OnDestroy, QueryList, ViewChildren} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Cart } from '../interfaces/cart';
import { CartService } from '../cart.service';
import { CartComponent } from '../cart/cart.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})


export class CartListComponent implements OnInit, OnDestroy {

  carts: Cart[] = [];
  selectedCarts: any[] = [];       // array of product ID's which are currently selected/checked
  totalPrice: number = 0;
  totalQuantity: number = 0;
  checkedAll: boolean = false;

  assetsUrl: string = "";

  @ViewChildren('cartRef') cartRefs!:QueryList<CartComponent>;      // View Child Reference to Child Carts
  private productUpdateSubscription?: Subscription;                       // Used for responding to changes to product data
  private productCheckOutSubscription?: Subscription;  // Subscription for observable if product is checkout 


  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAssetsUrl();
    this.getCarts();

    // Subscription for changes due to product update operation
    this.productUpdateSubscription = this.cartService.updatedProduct
    .subscribe((updatedProduct) => {
      for(const cart of this.carts){
        if(cart.productId === updatedProduct.productId){
          cart.price = updatedProduct.price;
          cart.stock = updatedProduct.stock;
          cart.title = updatedProduct.title;

          if(cart.quantity > cart.stock){     // If quantity requested is now greater than the new stock
            cart.quantity = cart.stock;
            this.getTotalPrice();
            this.getTotalQuantity();
          }
          break;
        }
      }
    }); 

    // Subscription for changes due to producte checkout operation 
    this.productCheckOutSubscription = this.cartService.checkedOutProduct
    .subscribe((checkedOutProducts) => {
      for(const outProduct of checkedOutProducts){
        for(const cart of this.carts){
          if(outProduct.productId === cart.productId){
            cart.stock -= outProduct.quantity;
            
            if(cart.quantity > cart.stock){     // If quantity requested is now greater than the new stock
              cart.quantity = cart.stock;
            };
            
            if(cart.stock <= 0){                // Uncheck the item if stock is 0 or less
              cart.isChecked = false;
            };

            break;
          }
        }
      }
      this.getTotalPrice();
      this.getTotalQuantity();
    });


  }

  ngOnDestroy(){
    this.productUpdateSubscription?.unsubscribe();
    this.productCheckOutSubscription?.unsubscribe();
  }

  getAssetsUrl(){
    this.assetsUrl = this.cartService.getAssetsUrl();
  }


  checkOut(){
    let payload = [];                      // Payload to be sent to the server

    for(const e of this.selectedCarts){    // Fill with data  
      let item = {
        productId: Number(e.productId),   
        quantity: Number(e.quantity)
      }
      payload.push(item);
    }

    this.cartService.checkOutCarts(payload)
    .subscribe((status) => {
      console.log(status);  
      this.selectedCarts = [];              // Clear selected carts array
      this.getTotalPrice();                 // Recalculate total price and quantity
      this.getTotalQuantity();

      this.router.navigateByUrl(`/checkout`);
    },
    (error) =>{
      console.log(error);
    })
  }

  selectAllCarts(){
    console.log("Checked All: " + this.checkedAll);
    if(this.checkedAll === true){
      for(const e of this.cartRefs.toArray()){
        if(e.cart && !e.cart.isChecked && e.cart.stock){
          e.setToChecked();
          e.checkSelection();
        }
      }  
    } else {
      for(const e of this.cartRefs.toArray()){
        if(e.cart){
          e.setToUnchecked();
          e.checkSelection();
        }
      }
    }
  }
 
  getCarts(){                                 // Initialization, getting all carts of the user 
    this.cartService.getCartSelf()
    .subscribe((data: any) => {
      if(!data.carts){
        this.carts = [];
      } else {
        for(const cart of data.carts){
          let newCart = {
            username: String(cart.username),
            productId: Number(cart.productId),
            sellerUsername: String(cart.sellerUsername),
            title: String(cart.title),
            imgUrl: String(`${this.assetsUrl}/products/${cart.imgUrl}`),
            price: Number(cart.price),
            stock: Number(cart.stock),
            quantity: Number(cart.quantity),
            isChecked: false
          }
  
          this.carts?.push(newCart);
        }
        console.log("Finished Getting Carts for Cart Component");
      }
    },
    (error) => {
      if(error instanceof HttpErrorResponse){
        if(error.status === 401){
          console.log(error)
          this.router.navigate(['/login']);
        }
      }
    })
  }

  getTotalPrice() {             
    this.totalPrice = 0;
    for(const e of this.selectedCarts){
      this.totalPrice += e.price * e.quantity
    }
  }

  getTotalQuantity(){
    this.totalQuantity = 0;
    for(const e of this.selectedCarts){
      this.totalQuantity += e.quantity
    }
  }


  updateCartSelection(cartOutput:any){        // Trigerred when cart is checked but quantity is adjusted

    for(const e of this.selectedCarts){               
      if(e.productId === cartOutput.productId){       
        let index = this.selectedCarts.indexOf(e);
        this.selectedCarts.splice(index,1);
        break;
      }
    }

    this.selectedCarts.push(cartOutput);      // add cartOutput to array of selected carts
    this.getTotalPrice();
    this.getTotalQuantity();

  }

  addCartToSelection(cartOutput:any){

    this.selectedCarts.push(cartOutput);      // add cartOutput to array of selected carts


    this.getTotalPrice();
    this.getTotalQuantity();
  }

  removeCartFromSelection(cartOutput:any){

    for(const e of this.selectedCarts){               // Find object in array with similar product Id
      if(e.productId === cartOutput.productId){       // Delete the object
        let index = this.selectedCarts.indexOf(e);
        this.selectedCarts.splice(index,1);
        break;
      }
    }
    this.getTotalPrice();
    this.getTotalQuantity();
  }

  deleteCart(productId:number){
    let index : any = null;             // Index in cart array
    let selectedIndex: any = null;      // Index in selected cart array

    for(const e of this.carts) {         // Get index in cart array
      if(e.productId === productId){
        index = this.carts.indexOf(e);
        break;
      }
    }

    for(const e of this.selectedCarts){ // Get index in selected carts array
      if(e.productId === productId){
        selectedIndex = this.selectedCarts.indexOf(e);
        break;
      }
    }

    this.cartService.removeCart(productId)
    .subscribe(() => {
      this.carts.splice(index,1);                     // Delete Cart from Main Cart List 

      if(selectedIndex !== null){                     // If the cart is not marked as selected then don't delete in selected carts
        this.selectedCarts.splice(selectedIndex,1);
      }

      this.getTotalPrice();                           // Update total price 
      this.getTotalQuantity();                        // Update total quantity 

    })
  }


} // end of component class

