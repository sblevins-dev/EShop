import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ProductPageComponent } from './Components/product/product-page/product-page.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductDetailComponent } from './Components/product/product-detail/product-detail.component';
import { AboutComponent } from './Components/about/about.component';
import { LoginComponent } from './Components/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductPageComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
