import { Component, inject } from '@angular/core';
import { Product, ProductService } from '../../Services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  products: Product[] = [];
  product: Product | undefined;
  productService: ProductService = inject(ProductService);
  route: ActivatedRoute = inject(ActivatedRoute);
  cartService = inject(CartService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      // Single product view
      this.productService.getProductById(+id).subscribe((data) => {
        this.product = data;
      });
    } else {
      // List all products
      this.productService.getProducts().subscribe((data) => {
        this.products = data;
      });
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert(`${product.name} has been added to the cart.`);
  }
}
