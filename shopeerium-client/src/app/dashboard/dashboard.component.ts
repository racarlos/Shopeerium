import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { Product } from '../interfaces/product';
import { Category } from '../interfaces/categories';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];
  assetsUrl: string = "";

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService) 
  { }

  ngOnInit(): void {
    this.getAssetsUrl();
    this.getProducts();
    this.getCategories();
  }

  getAssetsUrl(): void{
    this.assetsUrl = this.productService.getAssetsUrl();
  }

  getProducts(): void{                        // GET Products to be displayed using Product Service
    let productList: any[];

    this.productService.getProducts()
    .subscribe((data: any) => {  
      
      productList = data.products;

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

        this.products.push(newProduct);             // Add to products Array
      }
    }); 
  
  }

  getCategories(): void{
    this.categoryService.getCategories()
    .subscribe((data: any) => {
      const categoryArray = data.categories;

      for(const element of categoryArray){

        let newCategory = {
          name: String(element.category),
          imgUrl: String(`${this.assetsUrl}/categories`)
        };

        this.categories.push(newCategory);
      }
    })
  }

}
