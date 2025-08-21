import { Component, inject } from '@angular/core';
import { CartService } from '../../Services/cart.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  cartService = inject(CartService);

  get cartItemCount(): number {
  return this.cartService.getItems().reduce((total: number, item: any) => total + (item.quantity || 1), 0);
}
}
