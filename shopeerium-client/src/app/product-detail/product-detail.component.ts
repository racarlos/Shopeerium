import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../interfaces/product';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  @Input() product!: Product;                     // Current product displayed

  role: string = "";                  
  assetsUrl: string = "";

  private productUpdateSubscription?: Subscription;    // Subscription for observable if product detail is updated 
  private productCheckOutSubscription?: Subscription;  // Subscription for observable if product is checkout 

  constructor(
    private route: ActivatedRoute,                // used to get the productid in the route
    private router: Router,
    private productService: ProductService,       // used to get the particular product given a route
    private cartService: CartService,             // used for add to cart functionality 
    private toasterService: ToastrService       // For toast
  ) {}


  ngOnInit(): void {

    this.getRole();
    this.getAssetsUrl();
    this.getProduct();

    // Subscription for changes due to product update operation
    this.productUpdateSubscription = this.productService.updatedProduct
    .subscribe((updatedProduct) => {
      if(updatedProduct.productId === this.product.productId){
        this.product.title = updatedProduct.title;
        this.product.price = updatedProduct.price;
        this.product.stock = updatedProduct.stock;
      }
    })

    // Subscription for changes due to product checkout operation
    this.productCheckOutSubscription = this.productService.checkedOutProduct
    .subscribe((checkedOutProducts) => {
      for(const product of checkedOutProducts){
        if(product.productId === this.product.productId){
          this.product.stock -= product.quantity;
          this.product.amountSold += product.quantity;
        }
      }
    })


  }

  ngOnDestroy(){
    this.productUpdateSubscription?.unsubscribe();
    this.productCheckOutSubscription?.unsubscribe();
  }



  getRole(): void{
    this.role = String(localStorage.getItem('role'));
  }

  getProduct(): void {

    const productId = Number(this.route.snapshot.paramMap.get('productId'));

    this.productService.getProduct(productId)
    .subscribe((data: any) => {
      
        const product = data.product;

        let newProduct = {                          // Make temporary product and cast the types                        
          productId: Number(product.productId),
          sellerUsername: String(product.sellerUsername),
          title: String(product.title),
          imgUrl: String(`${product.imgUrl}`),
          price: Number(product.price),
          stock: Number(product.stock),
          amountSold: Number(product.amountSold),
          categories: JSON.parse(product.categories),
          description: String(product.description),
          quantity: 1
        };

        this.product = newProduct;
        console.log('Finished Getting the Product');
        console.log(this.product)
    })
  }

  getAssetsUrl(): void{
    this.assetsUrl = this.productService.getAssetsUrl();
    this.checkQuantity();
  }

  increment(){
    if(this.product?.quantity && this.product?.stock){
      if(this.product.quantity < this.product.stock){
      this.product.quantity += 1;
      }
    }
  } 

  decrement(){
    if(this.product?.quantity  && this.product.quantity > 1){
      this.product.quantity -= 1;
    }
  }

  checkQuantity(){
    if(this.product){
      if(this.product?.quantity && this.product.quantity > this.product.stock){
        this.product.quantity = this.product.stock;
      } else if (this.product.quantity <= 0){
        this.product.quantity = 1; 
      }
    }
  } 

  addToCart(){

    if(this.role !== 'buyer'){
      this.router.navigateByUrl('/login');
    }

    // Username will be appended in the server-side from verifying the JWT
    const newCart = {
      productId: this.product?.productId,
      sellerUsername: this.product?.sellerUsername,
      title: this.product?.title,
      imgUrl: this.product?.imgUrl,
      price: this.product?.price,
      stock: this.product?.stock,
      quantity: this.product?.quantity
    }

    this.cartService.addToCart(newCart)
    .subscribe((status) => {
      this.toasterService.success('','Item has been added to your shopping cart',{
        timeOut: 2500, 
        closeButton: true,
        positionClass: 'toast-top-center'
      });
      console.log(status);
    })
  }



}
