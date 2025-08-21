import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ProductPageComponent } from './Components/product-page/product-page.component';
import { CartComponent } from './Components/cart/cart.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductPageComponent },
  { path: 'products/:id', component: ProductPageComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
