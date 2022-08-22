import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../interfaces/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  matchedProducts: Product[] = [];
  assetsUrl: string = ""; 
  pattern: any = "";


  constructor(
    private productService: ProductService,
    private route : ActivatedRoute,
  ) { }

  ngOnInit(): void {


    this.assetsUrl = this.productService.getAssetsUrl();


    this.route.queryParams
    .subscribe((queryParams) => {
      this.matchedProducts = [];
      this.pattern = queryParams.pattern;

      this.productService.searchProducts(this.pattern)
      .subscribe((data: any) => {

        const productList = data.products;
        for(const product of productList){            // Add each product to the array 
          
          let newProduct = {                          // Make temporary product and cast the types                        
            productId: Number(product.productId),
            sellerUsername: String(product.sellerUsername),
            title: String(product.title),
            imgUrl: String(`${this.assetsUrl}/products/${product.imgUrl}`),
            price: Number(product.price),
            stock: Number(product.stock),
            amountSold: Number(product.amountSold),
            categories: JSON.parse(product.categories),
            description: String(product.description),
            quantity: 0
          };
    
          this.matchedProducts.push(newProduct);             // Add to products Array
        }
      })
    })
  }




} // end of component 
