import { CartItem } from '@@app/features/cart/store/models/cart-state-model';

export class AddCartItem {
  static readonly type: string = '[CART] Add cart item';

  constructor(public cartItem: CartItem) {}
}

export class RemoveCartItem {
  static readonly type: string = '[CART] Remove cart item';

  constructor(public cartItemId: string) {}
}

export class SetCartItemProductAmount {
  static readonly type: string = '[CART] Set cart item product amount';

  constructor(
    public cartItemId: string,
    public amount: number
  ) {}
}
