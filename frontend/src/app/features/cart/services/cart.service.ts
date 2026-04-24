import { CartItem, CartItemProduct, CartStateModel } from '@@app/features/cart/store/models/cart-state-model';
import { inject, Injectable } from '@angular/core';
import { StateContext, Store } from '@ngxs/store';
import { CartState } from '@@app/features/cart/store/cart.state';
import { generateUUID } from '@@app/utils/generators/id.generator';
import { AddCartItem, RemoveCartItem, SetCartItemProductAmount } from '@@app/features/cart/store/actions';

@Injectable({ providedIn: 'root' })
export class CartService {
  private store: Store = inject(Store);

  addProduct(product: CartItemProduct): void {
    const cartItem: CartItem | undefined = this.store.selectSnapshot(CartState.cartItemByProductId(product.id));
    if (cartItem) {
      return;
    }
    // Save product on server
    const newCartItem: CartItem = {
      id: generateUUID(),
      product,
      amount: 1
    };
    this.store.dispatch(new AddCartItem(newCartItem));
  }

  incrementCartItemAmount(cartItem: CartItem): void {
    this.store.dispatch(new SetCartItemProductAmount(cartItem.id, cartItem.amount + 1))
  }

  decrementCartItemAmount(cartItem: CartItem): void {
    if (cartItem.amount > 0) {
      this.store.dispatch(new SetCartItemProductAmount(cartItem.id, cartItem.amount - 1));
    }
  }

  removeCartItem(cartItem: CartItem){
    this.store.dispatch(new RemoveCartItem(cartItem.id));
  }
}

