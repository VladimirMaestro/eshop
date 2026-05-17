import { Component, inject, Signal } from '@angular/core';
import { CartService } from '@@app/features/cart/services/cart.service';

@Component({
  selector: 'app-cart-result',
  standalone: false,
  templateUrl: 'cart-result.component.html',
  styleUrls: ['cart-result.component.scss'],
})
export class CartResultComponent {
  private cartService = inject(CartService);

  totalPrice: Signal<number> = this.cartService.getTotalPrice();
}
