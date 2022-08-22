import { HttpErrorResponse } from '@angular/common/http';
import { FileUploadService } from '../file-upload.service';
import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  username!: string ;
  password?: string ;
  passwordConfirm?: string;
  image!: any;
  firstName?: string ;
  lastName?: string ;
  number?: number;
  email?: string ;
  role?: string ;

  isSeller: boolean = false;                // Open Second registration form for shop details reg
  finishedUserData: boolean = false;

  hasFile: boolean = false;
  hasError: boolean = false;
  errorMessage: string = "";
  finishedTransaction: boolean = false;
  transactionSuccessful: boolean = false;

  shopName?: string;
  shopImgUrl?: string;

  message!: string;

  constructor(
    private userService: UserService,
    private shopService: ShopService,
    private fileUploadService: FileUploadService
  ) 
  { }

  ngOnInit(): void {

  }

  selectImage(event:any){
    if(event.target.files.length > 0){
      this.image = event.target.files[0];
      this.hasFile = true;
    }
  }

  uploadImage(){
    const formData = new FormData();
    this.shopImgUrl = String(this.username + '.jpg');
    formData.append('imageFile',this.image,this.shopImgUrl)  // filename is [product.productId].jpg

    this.fileUploadService.uploadUserImage(formData)
    .subscribe((data) => {

    },
    (error) => {
      console.error(error);
      this.finishedTransaction = true;
      this.transactionSuccessful = false;
      this.message = "Sorry, we cannot process your request as of the moment.";
    });
  }

  uploadShopImage(){
    const formData = new FormData();
    formData.append('imageFile',this.image,String(this.username) + '.jpg')  // filename is [product.productId].jpg

    this.fileUploadService.uploadShopImage(formData)
    .subscribe((data) => {

    },
    (error) => {
      console.error(error);
      this.finishedTransaction = true;
      this.transactionSuccessful = false;
      this.message = "Sorry, we cannot process your request as of the moment.";
    });
  }


  validateRegInfo(formData: any): void {
    
    this.hasError = false;
    let numberPattern = new RegExp('^9[0-9]{9}$');

    if(this.role === 'seller'){               // Used for opening new div
      this.isSeller = true;
    }

    if(!this.hasFile){
      this.hasError = true;
      this.errorMessage = "Please upload an image for the user"
    }

    if(this.role === undefined){
      this.hasError = true;
      this.errorMessage = "Please choose a role for the account."
    }

    if(!numberPattern.test(String(this.number))){
      this.hasError = true;
      this.errorMessage = "Number does not match given pattern"
      console.log("Error in number pattern");
    }

    if(this.password !== this.passwordConfirm){
      this.hasError = true;
      this.errorMessage = "Error Password entries do not match. Please try again."
      console.log("Error in password confirmation")
    } 

    if(this.hasError === false){
      formData.number = Number('0' + String(this.number));
      formData.imgUrl = String(this.username + '.jpg');
      console.log(formData);
      this.userService.postUser(formData)
      .subscribe((data) => {

        this.uploadImage();
        
        if(this.isSeller){                      // Change div to shop registration
          this.hasFile = false;                 // recycle has file for shop image upload 
          this.finishedUserData = true;
        } else {
          this.finishedTransaction = true;      // Show Success page 
          this.transactionSuccessful = true;
          this.message = "Your Account has now been Created!"
        }

      },
      (error) => {
        console.error(error);
        if(error instanceof HttpErrorResponse){
          if(error.status === 409){
            this.errorMessage = "Error! This username is already taken, please choose another one."
          }
          else {
            this.errorMessage = "Sorry, we cannot process your request at the moment please try again later."
          }
          this.hasError = true;
        }
      });
    }
  }
  
  
  validateShopInfo(formData: any){
    formData.sellerUsername = this.username;
    formData.shopLogo = this.shopImgUrl;
    formData.email = this.email;
    formData.number = this.number;
    formData.productCount = 0;
    formData.dateJoined = "August 2021";
    
    this.shopService.addShop(formData)
    .subscribe((data) => {
      this.uploadShopImage();
      this.finishedTransaction = true;
      this.transactionSuccessful = true;
      this.message = "Success your Seller Account and Shop Has been Created.";
    },
    (error) => {
      console.error(error)
      this.hasError = true;
      this.finishedTransaction = false;
      this.transactionSuccessful = false;
      this.message = "Oh no! Something went wrong with your account registration!";
    
    });

  }
}

