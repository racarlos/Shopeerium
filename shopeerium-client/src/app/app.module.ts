// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination'; 

// Components 
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductByCategoryComponent } from './product-by-category/product-by-category.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { RegisterComponent } from './register/register.component';
import { CartListComponent } from './cart-list/cart-list.component';
import { SearchComponent } from './search/search.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopPageComponent } from './shop-page/shop-page.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { TransactionCompleteComponent } from './transaction-complete/transaction-complete.component';
import { environment } from 'src/environments/environment';

const config: SocketIoConfig = { url: environment.apiUrl, options: {} };


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ProductListComponent,
    ProductCardComponent,
    DashboardComponent,
    CategoryListComponent,
    CartComponent,
    ProfileComponent,
    ProductDetailComponent,
    ProductByCategoryComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    CartListComponent,
    SearchComponent,
    CheckoutComponent,
    ShopPageComponent,
    AddProductComponent,
    EditProductComponent,
    DeleteProductComponent,
    FileUploadComponent,
    TransactionCompleteComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    BrowserAnimationsModule,
    ToastrModule.forRoot({preventDuplicates: true}),
    NgxPaginationModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
