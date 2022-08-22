import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductByCategoryComponent } from './product-by-category/product-by-category.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CartListComponent } from './cart-list/cart-list.component';
import { SearchComponent } from './search/search.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopPageComponent } from './shop-page/shop-page.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },                                    // For Homepage 
  { path: 'checkout', component: CheckoutComponent },                                      // For Checkout after cart page 
  { path: 'products/:productId', component: ProductDetailComponent},                       // For Viewing specific product Detail
  { path: 'search', component: SearchComponent},                                           // For Searching Product based on pattern 
  { path: 'category/:category', component: ProductByCategoryComponent},                    // For Searching Product based on category
  { path: 'cart', component: CartListComponent, canActivate: [AuthGuard]},                 // For Cart Viewing
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},               // For Viewing Own Profile 
  { path: 'login', component: LoginComponent},                                             // For Login 
  { path: 'register', component: RegisterComponent},                                       // For Registration 
  { path: 'shop/:sellerUsername', component: ShopPageComponent, canActivate: [AuthGuard]}, // For Shop Page Viewing
  { path: 'shop/:sellerUsername/add-product', component: AddProductComponent, canActivate: [AuthGuard]},
  { path: 'shop/:sellerUsername/edit-product', component: EditProductComponent, canActivate: [AuthGuard]},
  { path: 'shop/:sellerUsername/delete-product', component: DeleteProductComponent, canActivate: [AuthGuard]},
  { path: '**', component: PageNotFoundComponent}                                         // Faulty Routes 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
