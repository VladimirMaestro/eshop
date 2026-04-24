import { Component, inject, input, InputSignal } from '@angular/core';
import { CartService } from '@@app/features/cart/services/cart.service';
import { CartItem } from '@@app/features/cart/store/models/cart-state-model';

@Component({
  selector: 'app-cart-item',
  standalone: false,
  templateUrl: 'cart-item.component.html',
})
export class CartItemComponent {
  private cartService: CartService = inject(CartService);
  item: InputSignal<CartItem> = input.required();

  constructor() {
    console.log('CartItemComponent');
  }

  decrementAmount(){
    this.cartService.decrementCartItemAmount(this.item());
  }
  incrementAmount(){
    this.cartService.incrementCartItemAmount(this.item());
  }

  remove(){
    this.cartService.removeCartItem(this.item());
  }
}
