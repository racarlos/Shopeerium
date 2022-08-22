import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-product-by-category',
  templateUrl: './product-by-category.component.html',
  styleUrls: ['./product-by-category.component.css']
})


export class ProductByCategoryComponent implements OnInit {

  products: Product[]= [];
  currentCategory: string = "";
  private assetsUrl: string = "";

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService
  ) 
  { }

  ngOnInit(): void {
    this.getAssetsUrl();
    this.getProductsByCategory();
  }

  getAssetsUrl(): void{
    this.assetsUrl = this.productService.getAssetsUrl();
  }

  getProductsByCategory(): void {
    this.currentCategory = String(this.route.snapshot.paramMap.get('category'));
    let productList: any[];

    this.productService.getProductByCategory(this.currentCategory)
    .subscribe((data: any) => {
      productList = data.products;

      for(const product of productList){

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

        this.products.push(newProduct); 
      }

      console.log('ProductByCategory - Finished Getting the Products');

    });

  }


}
