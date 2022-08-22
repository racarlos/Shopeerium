import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Shop } from '../interfaces/shop';
import { ProductService } from '../product.service';
import { Product } from '../interfaces/product';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css']
})

export class ShopPageComponent implements OnInit {
  
  shop!: Shop;                    // Shop Details
  products: Product[] = [];       // products sold by this shop

  user: string = "";              // username of logged in user
  role: string = "";              // role of current user 
  shopOwner: string = "";         // owner of current shop page 
  isOwner: boolean = false;       // status to determine if current user is shop owner 

  productAssetsUrl: string = "";
  shopAssetsUrl: string = "";

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private productService: ProductService
  ) 
  { }


  ngOnInit(): void {

    // Get Assets URL
    this.productAssetsUrl = this.productService.getAssetsUrl();
    this.shopAssetsUrl = this.shopService.getAssetsUrl();

    this.role = String(localStorage.getItem('role'));
    this.user = String(localStorage.getItem('username'));     // Get current user details 
    this.shopOwner = this.getShopOwner();                     // Get Shop owner name based on route
    this.isOwner = this.getOwnerStatus();                     // Check if logged in user is the shop owner 

    this.getShopData();
    this.getProducts();

  } // End of ngOnInit 

  // Get Shop Details
  getShopData(): void {
    this.shopService.getShop(this.shopOwner)              
    .subscribe((data: any) => {
      this.shop = data.shop;
      this.shop.shopLogo = `${this.shopAssetsUrl}/${this.shop.shopLogo}`;   // append api url 
    })
  }

  // Get List of Products by this shop
  getProducts(): void{
    this.productService.getProductBySeller(this.shopOwner)
    .subscribe((data: any) => {
      for(const product of data.products){
        let newProduct = {                                           
          productId: Number(product.productId),
          sellerUsername: String(product.sellerUsername),
          title: String(product.title),
          imgUrl: String(`${this.productAssetsUrl}/products/${product.imgUrl}`),
          price: Number(product.price),
          stock: Number(product.stock),
          amountSold: Number(product.amountSold),
          categories: JSON.parse(product.categories),
          description: String(product.description),
          quantity: 0
        };
        this.products.push(newProduct);
      }
    })
  }

  getShopOwner(): string {
    return String(this.route.snapshot.paramMap.get('sellerUsername'));
  }

  getOwnerStatus(): boolean {
    if(this.user === this.shopOwner){
      return true;
    } else {
      return false
    }
  }


}
