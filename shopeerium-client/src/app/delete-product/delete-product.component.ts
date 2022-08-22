import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {

    // Component Properties

    products: Product[] = [];
    selectedProduct!: Product;                  // Product to be edited
  
    shopOwner: string = "";
    hasSelectedProduct: Boolean = false;
    selectedProductId: string|number = "";

    // Values to be passed to transaction complete component 
    finishedTransaction: boolean = false;
    transactionSuccessful: boolean = false;
    message: string = "";
      

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.shopOwner = this.getShopOwner()
    this.getProducts(this.shopOwner);
  }

  getShopOwner(): string {
    return String(this.route.snapshot.paramMap.get('sellerUsername'));
  }

  getProducts(shopOwner: string): void {
    this.productService.getProductBySeller(shopOwner)
    .subscribe((data: any) => {
      for(const product of data.products){
        let newProduct = {                                           
          productId: Number(product.productId),
          sellerUsername: String(product.sellerUsername),
          title: String(product.title),
          imgUrl: String(`${product.imgUrl}`),
          price: Number(product.price),
          stock: Number(product.stock),
          amountSold: Number(product.amountSold),
          categories: JSON.parse(product.categories),
          description: String(product.description),
          quantity: 0
        };
        this.products.push(newProduct);
      }
      console.log(this.products)

    })
  }

  selectProduct(): void {
    this.selectedProductId = Number(this.selectedProductId);

    console.log("Selected Product ID: ")
    console.log(this.selectedProductId)

    for(const e of this.products){                          // Search for the Product to be Deleted
      if(e.productId === this.selectedProductId){
        this.selectedProduct = e;
        this.hasSelectedProduct = true;
        break;
      }
    }
  }

  deleteProduct(): void {
    this.productService.deleteProduct(this.selectedProduct.productId)
    .subscribe((data)=> { 
      console.log(data);
      this.finishedTransaction = true;
      this.transactionSuccessful = true;
      this.message = `Product: ${this.selectedProduct.title} has been deleted.`
    },
    (error) => {
      console.log(error);
      this.finishedTransaction = true;
      this.transactionSuccessful = false;
      this.message = `Unable to delete product: ${this.selectedProduct.title}.`

    });
  }

}
