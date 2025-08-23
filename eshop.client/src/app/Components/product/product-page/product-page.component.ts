import { Component, inject } from '@angular/core';
import { Product, ProductService } from '../../../Services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../Services/cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  minPrice: number | null = null;
  maxPrice: number | null = null;
  products: Product[] = [];
  product: Product | undefined;
  productService: ProductService = inject(ProductService);
  route: ActivatedRoute = inject(ActivatedRoute);
  cartService = inject(CartService);
  categories: string[] = [];
  selectedCategory: string = 'All';
  filteredProducts: Product[] = [];
  toastMessage: string = '';
  showToast: boolean = false;

  ngOnInit(): void {
      this.productService.getProducts().subscribe((data) => {
        this.products = data;
        this.categories = Array.from(new Set(data.map(p => p.category)));
        this.categories.unshift('All'); // Add 'All' option at the beginning
        this.route.queryParams.subscribe(params => {
          const category = params['category'] || 'All';
          this.selectedCategory = category;
          this.applyFilters();
        });
        this.products.forEach(p => {
          p.thumbnail = this.productService.getFullImageUrl(p.thumbnail);
        });
      });
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(p => {
      const categoryCheck = this.selectedCategory === 'All' ? true : p.category === this.selectedCategory;
      const minCheck = this.minPrice != null ? p.price >= this.minPrice : true;
      const maxCheck = this.maxPrice != null ? p.price <= this.maxPrice : true;
      return categoryCheck && minCheck && maxCheck;
    });
  }


  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.showToast = true;
    this.toastMessage = `${product.title} has been added to your cart.`;

    setTimeout(() => this.showToast = false, 3000); // hide after 3s
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    if (category === 'All') {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(p => p.category === category);
    }
  }

  applyPriceFilter() {
    this.filteredProducts = this.products.filter(p => {
      const minCheck = this.minPrice != null ? p.price >= this.minPrice : true;
      const maxCheck = this.maxPrice != null ? p.price <= this.maxPrice : true;
      const categoryCheck = this.selectedCategory === 'All' ? true : p.category === this.selectedCategory;
      return minCheck && maxCheck && categoryCheck;
    });
  }

  clearPriceFilter() {
    this.minPrice = null;
    this.maxPrice = null;
    this.filterByCategory(this.selectedCategory); // Reapply category filter
  }
}
