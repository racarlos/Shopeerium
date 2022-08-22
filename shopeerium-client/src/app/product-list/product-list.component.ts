import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() productLength!: number;
  @Input() products!: Product[];       // List of Products to be passed to individual product cards
  page: number = 1;

  constructor() { }

  ngOnInit(): void {

  }

}
