import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface Product {
  id: number;
  title: string;
  description: string;
  category: Category;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

export interface Category {
  name: string;
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;   // ISO string
  reviewerName: string;
  reviewerEmail: string;
}

export interface Meta {
  createdAt: string;  // ISO string
  updatedAt: string;  // ISO string
  barcode: string;
  qrCode: string;
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(`${this.apiUrl}/api/products`);
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/api/products/${id}`);
  }

  getFeaturedProducts() {
    return this.http.get<Product[]>(`${this.apiUrl}/api/products/featured`);
  }

  getFullImageUrl(imagePath: string): string {
    return `${environment.apiUrl}${imagePath}`;
  }
}
