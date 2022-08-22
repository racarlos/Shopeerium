import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { FileUploadService } from '../file-upload.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {

  // First Form Values
  sellerUsername: string = "";
  title?: string;
  price?: number;
  stock?: number;
  category?: string;
  description?: string;

  // Second Form Values 
  finishedUserData: boolean = false;
  hasFile: boolean = false;
  newProductId: number = 0;
  image: any;
  testNewProduct: any;

  // Values to be passed to transaction complete component 
  finishedTransaction: boolean = false;
  transactionSuccessful: boolean = false;
  message: string = "";

  categories = [
    {name: 'Accessories', value:'Accessories', checked: false},
    {name: 'Appliances', value:'Appliances', checked: false},
    {name: 'Art', value:'Art', checked: false},
    {name: 'Clothings', value:'Clothings', checked: false},
    {name: 'Food', value:'Food', checked: false},
    {name: 'Furnitures', value:'Furnitures', checked: false},
    {name: 'Health', value:'Health', checked: false},
    {name: 'Home', value:'Home', checked: false},
    {name: 'Mobile', value:'Mobile', checked: false},
    {name: 'Music', value:'Music', checked: false},
    {name: 'Pets', value:'Pets', checked: false},
    {name: 'Technology', value:'Technology', checked: false},
    {name: 'Toys', value:'Toys', checked: false},
    {name: 'Tools', value:'Tools', checked: false},
  ];

  constructor(
    private productService: ProductService,
    private fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void {
    this.sellerUsername = String(localStorage.getItem('username'));
  }

  validateInput(formValue: any){

    formValue.sellerUsername = this.sellerUsername;

    if(this.getSelectedCategories().length === 0){
      formValue.category = null;
    } else {
      formValue.category = JSON.stringify(this.getSelectedCategories());  
    }

    // console.log(formValue);

    this.productService.addProduct(formValue)
    .subscribe((data: any) => {

      this.newProductId = data.newProduct.productId;                            // get product ID to name file upload
      this.finishedUserData = true;
    },
    (error) => {
      console.error(error)
      this.finishedTransaction = true;
      this.transactionSuccessful = false;
      this.message = "Sorry, we cannot process your request as of the moment." ;

    })
  }

  getSelectedCategories() { 
    return this.categories.filter(opt => opt.checked).map(opt => opt.value)
  }

  selectImage(event:any){
    if(event.target.files.length > 0){
      this.image = event.target.files[0];
      this.hasFile = true;
    }
  }

  uploadImage(){
    const formData = new FormData();
    formData.append('imageFile',this.image,String(this.newProductId) + '.jpg')  // filename is [product.productId].jpg

    console.log('Form Data: ');
    console.log(formData);

    this.fileUploadService.uploadProductImage(formData)
    .subscribe((data) => {
      console.log(data);
      this.finishedTransaction = true;
      this.transactionSuccessful = true;
      this.message = "Product has been created and item image has been uploaded!"
    },
    (error) => {
      console.error(error);
      this.finishedTransaction = true;
      this.transactionSuccessful = false;
      this.message = "Sorry, we cannot process your request as of the moment.";
    });
  }

}



