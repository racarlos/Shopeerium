import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product?:Product;        // Product to be Shown in the card 


  constructor(
    private productService: ProductService
  )
   
  {}

  ngOnInit(): void {

  }

}
