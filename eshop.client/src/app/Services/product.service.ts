import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  isFeatured: boolean;
  category: string;
  imageURL: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7217/api';

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  getFeaturedProducts() {
    return this.http.get<Product[]>(`${this.apiUrl}/products/featured`);
  }
}
