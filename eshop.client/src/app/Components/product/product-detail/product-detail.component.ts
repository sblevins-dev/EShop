import { Component, inject, OnInit } from '@angular/core';
import { Product, ProductService } from '../../../Services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../Services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  quantity = 1;
  toastMessage = '';
  showToast = false;

  productService: ProductService = inject(ProductService);
  route: ActivatedRoute = inject(ActivatedRoute);
  cartService: CartService = inject(CartService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(+id).subscribe((product) => {
        this.product = product;
        this.product.thumbnail = this.productService.getFullImageUrl(this.product.thumbnail);
      });
    }
  }

  addToCart(product: Product, quantity: number): void {
    this.cartService.addToCart(product, quantity);

    this.showToast = true;
    this.toastMessage = `${product.title} has been added to your cart.`;

    setTimeout(() => this.showToast = false, 3000); // hide after 3s
  }
}
