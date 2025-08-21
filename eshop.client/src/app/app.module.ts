import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { NavComponent } from './Components/nav/nav.component';
import { ProductPageComponent } from './Components/product-page/product-page.component';
import { FooterComponent } from './Components/footer/footer.component';
import { CartComponent } from './Components/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    ProductPageComponent,
    FooterComponent,
    CartComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
