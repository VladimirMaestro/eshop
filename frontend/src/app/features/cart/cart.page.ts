import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { CartItem } from '@@app/features/cart/store/models/cart-state-model';
import { CartState } from '@@app/features/cart/store/cart.state';

@Component({
  standalone: false,
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss']
})
export class CartPage implements OnInit {
  private store: Store = inject(Store);
  public cartItems: CartItem[] = [];

  ngOnInit(): void {
    this.store.select(CartState.items).subscribe((items: CartItem[]) => {
      // this.cartCount = items.length;
      // this.products = products;
      this.cartItems = items;
      console.log(items)
      // this.cartProducts = items;
    });
  }

  trackByCartItemId(index: number, item: CartItem): string {
    return item.id;
  }
}
