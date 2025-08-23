import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { NavComponent } from './Components/nav/nav.component';
import { ProductPageComponent } from './Components/product/product-page/product-page.component';
import { FooterComponent } from './Components/footer/footer.component';
import { CartComponent } from './Components/cart/cart.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductDetailComponent } from './Components/product/product-detail/product-detail.component';
import { AboutComponent } from './Components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    ProductPageComponent,
    FooterComponent,
    CartComponent,
    ProductDetailComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, CommonModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
