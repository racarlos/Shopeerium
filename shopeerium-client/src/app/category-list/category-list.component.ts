import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../interfaces/categories';


@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})

export class CategoryListComponent implements OnInit {

  firstRow: string[] = ["Accessories","Appliances","Art","Clothings","Food","Furnitures","Health"];
  secondRow: string[] = ["Home","Mobile","Music","Pets","Technology","Tools","Toys"];

  @Input() categories?: Category[];
  @Input() assetsUrl?: string;

  constructor(
    
  ) 
  { }

  ngOnInit(): void {
  }


}
