import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction-complete',
  templateUrl: './transaction-complete.component.html',
  styleUrls: ['./transaction-complete.component.css']
})
export class TransactionCompleteComponent implements OnInit {

  @Input() transactionSuccessful!: boolean;
  @Input() sellerUsername!:string;
  @Input() message!:string;
  @Input() origin!:string;


  constructor() { }

  ngOnInit(): void {
  }

}
