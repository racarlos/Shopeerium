import { Component, Input, OnInit } from '@angular/core';
import { Cart } from '../interfaces/cart';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  @Input() cart?: Cart;
  @Output() checkedCartEvent = new EventEmitter<any>();     // Binds to event add Cart to selection
  @Output() uncheckedCartEvent = new EventEmitter<any>();   // Binds to event remove Cart from selection
  @Output() updateCartEvent = new EventEmitter<any>();      // Binds to updating cart quantity if checked
  @Output() deleteCartEvent  = new EventEmitter<any>();

  // view child decorator

  constructor(
  ) { }

  ngOnInit(): void {

  }

  handleSelection(){                                        // Invoked when user clicks on checkbox itself
    if(this.cart){
      this.cart.isChecked = !this.cart.isChecked;
      this.checkSelection();  
    }
  }

  setToChecked(){                                           // Called by cart-list for selectall set to checked
    if(this.cart){
      this.cart.isChecked = true;
    }
  }

  setToUnchecked(){                                         // Called by cart-list for selectall set to unchecked
    if(this.cart){
      this.cart.isChecked = false;  
    }
  }
  
  checkSelection(){                                         // Verify selection and call appropriate handler functions
    if(this.cart){
      console.log(`in check selection : ${this.cart.isChecked}`)

      if(this.cart.isChecked){           // Add to Selection
        this.addToSelection();
      } else {                      // Remove from Selction 
        this.removeFromSelection();
      }
    }
  }

  getCartOutput(): any{
    if(this.cart){
      let cartOutput = {
        productId: this.cart.productId,
        quantity: this.cart.quantity,
        price: this.cart.price
      }

      return cartOutput;
    }
  }

  addToSelection(){
    if(this.cart){

      const cartOutput = this.getCartOutput();

      this.checkedCartEvent.emit(cartOutput);
    }
  }

  removeFromSelection(){
    if(this.cart){
      const cartOutput = this.getCartOutput();

      this.uncheckedCartEvent.emit(cartOutput);
    }
  }

  updateSelection(){
    if(this.cart && this.cart?.isChecked){
      const cartOutput = this.getCartOutput();

      this.updateCartEvent.emit(cartOutput);
    }
  }

  deleteCart(){
    if(this.cart){
      this.deleteCartEvent.emit(this.cart.productId);
    }
  }


  increment(){
    if(this.cart?.quantity && this.cart?.stock){
      if(this.cart.quantity < this.cart.stock){
      this.cart.quantity += 1;
      }
    }

    if(this.cart?.isChecked){         // If checked then call update selection
      this.updateSelection();
    }
  } 

  decrement(){
    if(this.cart?.quantity  && this.cart.quantity > 1){
      this.cart.quantity -= 1;
    }

    if(this.cart?.isChecked){       // If checked then call update selection
      this.updateSelection();
    }

  }

  checkQuantity(){
    if(this.cart){
      if(this.cart?.quantity && this.cart.quantity > this.cart.stock){
        this.cart.quantity = this.cart.stock;
      } else if(this.cart.quantity <= 0){
        this.cart.quantity = 1; 
      }
    }
    this.updateSelection();
  } 




}
