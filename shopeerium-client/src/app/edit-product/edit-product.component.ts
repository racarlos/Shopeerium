import { Component, OnInit } from '@angular/core';
import { Product } from '../interfaces/product';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { FileUploadService } from '../file-upload.service';



@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})


export class EditProductComponent implements OnInit {

  // Component Properties

  products: Product[] = [];
  selectedProduct!: Product;                  // Product to be edited

  hasSelectedProduct: Boolean = false;
  hasInitializedCategories: Boolean = false;

  shopOwner: string = "";
  productAssetsUrl: string = "";
  selectedProductId: string|number = "";
  hasFile: boolean = false;
  image: any;

  // Values to be passed to transaction complete component 
  finishedTransaction: boolean = false;
  transactionSuccessful: boolean = false;


  message: string = "";
  productImgUrl?: string;

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
    {name: 'Toys', value:'Accessories', checked: false},
    {name: 'Tools', value:'Tools', checked: false},
  ];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private fileUploadService: FileUploadService
  ) { }


  ngOnInit(): void {

    this.shopOwner = this.getShopOwner();              

    // Get List of Products by this shop
    this.productService.getProductBySeller(this.shopOwner)
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
    })

  } // End of ngOnInit 

  getShopOwner(): string {
    return String(this.route.snapshot.paramMap.get('sellerUsername'));
  }

  selectProduct()  {
    this.selectedProductId = Number(this.selectedProductId);

    for(const e of this.products){
      if(e.productId === this.selectedProductId){
        this.selectedProduct = e;
        this.initSelectedCategories();
        this.hasSelectedProduct = true;
        this.hasInitializedCategories = true;

        break;
      }
    }
  }

  validateUpdateInfo(formValue: any){

    // if(formValue.)

    console.log(formValue);

    if(this.getSelectedCategories().length === 0){
      alert("Please Choose at least one category.")
    }

    formValue.imgUrl = String(this.selectedProductId + '.jpg');
    formValue.productId = this.selectedProductId;
    formValue.sellerUsername = this.shopOwner;
    formValue.amountSold = this.selectedProduct.amountSold;

    if(this.getSelectedCategories().length === 0){
      formValue.category = null;
    } else {
      formValue.category = JSON.stringify(this.getSelectedCategories());  
    }


    this.productService.updateProduct(formValue)
    .subscribe((data) => {
      console.log(data);

      if(this.hasFile){                          // Change Product Image if file was given
        this.uploadImage();                          
      }
      this.finishedTransaction = true;
      this.transactionSuccessful = true;
      this.message = "Product information has been updated!";

    },
    (error) => {
      console.error(error)
      this.finishedTransaction = true;
      this.transactionSuccessful = false;
      this.message = "Sorry, we cannot process your request as of the moment." ;
    })
  }

  selectImage(event:any){
    if(event.target.files.length > 0){
      this.image = event.target.files[0];
      this.hasFile = true;
    }
  }

  uploadImage(){
    const formData = new FormData();
    this.productImgUrl = String(this.selectedProductId + '.jpg');
    formData.append('imageFile',this.image,this.productImgUrl)  // filename is [product.productId].jpg

    this.fileUploadService.uploadProductImage(formData)
    .subscribe((data) => {

    },
    (error) => {
      console.error(error);
      this.finishedTransaction = true;
      this.transactionSuccessful = false;
      this.message = "Sorry, we cannot process your request as of the moment.";
    });
  }

  
  getSelectedCategories() { 
    return this.categories.filter(opt => opt.checked).map(opt => opt.value)
  }

  initSelectedCategories() {

    let selectedCategories:string[] = [];
    this.selectedProduct.categories.forEach(e => selectedCategories.push(String(e)));
    
    if(selectedCategories.length){
      for(let e of selectedCategories){
        for(let cat of this.categories){
          if(e === cat.name){
            cat.checked = true;
            break;
          }
        }
      }
    } // end-if
  }


}



